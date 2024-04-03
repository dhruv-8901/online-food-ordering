import knex from "../common/config/database.config";
import Helper from "../common/helper/helper";
import StoreItemService from "../store-items/store-items.service";
import StoreService from "../stores/store.service";
import PaymentService from "../payments/payments.service";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  ORDER_STATUS,
  TAXES,
} from "../common/constant";
import BadRequestException from "../common/exception/bad-request.exception";
import AddressService from "../customer-addresses/customer-addresses.service";
import CartService from "../carts/carts.service";
import NotFoundException from "../common/exception/not-found.exception";
import FcmHelper from "../common/helper/fcm.helper";
import Stripe from "stripe";
import constantsConfig from "../common/config/constants.config";
require("dotenv").config();
const StripeKey = process.env.STRIPE_KEY;
const stripe = Stripe(StripeKey);

class OrderService {
  /**
   *  Order Placed
   * @param {*} customerId
   * @param {*} addressId
   */
  static async placeOrder(customerId, addressId, orderingInstruction, cardId) {
    const addressExist = await AddressService.findByUserId(
      addressId,
      customerId
    );
    if (!addressExist) {
      throw new BadRequestException("Invalid address");
    }
    const cartItems = await CartService.getCartItemDetailsByUserId(customerId);

    if (cartItems.length === 0) {
      throw new BadRequestException("Your Cart Is Empty");
    }

    await StoreService.checkStoreOpenOrNot(cartItems[0].storeId);

    const orderNumber = Helper.generateOrderNumber();
    const paymentData = PaymentService.calculateCartPaymentDetails(cartItems);

    const orderData = {
      orderNumber,
      customerId,
      storeId: cartItems[0].storeId,
      addressId,
      total: paymentData.itemTotal,
      charges: paymentData.taxes,
      grandTotal: paymentData.grandTotal,
      orderingInstruction,
    };

    const order = await this.createOrder(orderData);

    await this.createOrderItems(order.id, cartItems);

    await PaymentService.createCharges(order.id, cardId, orderData);

    await CartService.clearUserCart(customerId);

    await Helper.sendOrderPushNotificationToStore(ORDER_STATUS.PENDING, order);

    return order.id;
  }

  /**
   *  Get Specific Order Details By id
   * @param {*} orderId
   * @returns
   */
  static async getOrderDetails(orderId, paymentData = true) {
    let orderData = await knex("orders")
      .select(
        "*",
        "orders.createdAt AS orderTime",
        "orders.orderingInstruction AS orderingInstruction",
        "orders.id AS orderId",
        "orders.status AS status",
        "us.firstName AS customerFirstName",
        "us.lastName AS customerLastName",
        "us.phone AS customerPhone",
        "users.storeName AS storename",
        "users.id AS storeid",
        "users.profileImage AS storeImage",
        "store_addresses.addressLine2  AS storeAddress",
        "customer_addresses.addressLine1 AS customerAddressLine1",
        "customer_addresses.addressLine2 AS customerAddressLine2",
        "customer_addresses.latitude AS customerLatitude",
        "customer_addresses.longitude AS customerLongitude",
        "order_payment_details.status AS paymentStatus",
        "order_payment_details.cardId AS paymentCardId",
        "customer_payment_details.accountId AS customerAccountId",
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE storeId = users.id) AS totalRating`
        ),
        knex.raw(
          `(SELECT ROUND(AVG(rating),2) FROM feedbacks WHERE storeId = users.id) AS avgRating`
        )
      )
      .innerJoin("users", "users.id", "=", "orders.storeId")
      .innerJoin(
        "customer_addresses",
        "customer_addresses.id",
        "=",
        "orders.addressId"
      )
      .innerJoin(
        "store_addresses",
        "store_addresses.userId",
        "=",
        "orders.storeId"
      )
      .leftJoin(
        "order_payment_details",
        "order_payment_details.orderId",
        "=",
        "orders.id"
      )
      .leftJoin(
        "customer_payment_details",
        "customer_payment_details.customerId",
        "=",
        "orders.customerId"
      )
      .innerJoin("users AS us", "us.id", "=", "orders.customerId")
      .where("orders.id", orderId)
      .first();

    if (paymentData) {
      if (orderData.customerAccountId && orderData.paymentCardId) {
        try {
          const card = await stripe.customers.retrieveSource(
            orderData.customerAccountId,
            orderData.paymentCardId
          );

          orderData.paymentMethod = {
            name: card.brand,
            cardLogoUrl: constantsConfig.baseUrl(
              `cards/${card.brand.toLowerCase()}.png`
            ),
          };

          delete orderData.customerAccountId;
          delete orderData.paymentCardId;
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }
    }

    const data = {
      ...orderData,
      items: await this.getOrderItemDetails(orderId),
    };

    return data;
  }

  /**
   *  Get customer order history
   * @param {*} customerId
   * @returns
   */
  static async getOrderHistory(
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE,
    customerId
  ) {
    const orderData = await knex("orders")
      .where("orders.customerId", customerId)
      .orderBy("orders.createdAt", "desc")
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });

    const data = await Promise.all(
      orderData.data.map(
        async (value) => await this.getOrderDetails(value.id, false)
      )
    );

    return { data, meta: orderData.pagination };
  }

  /**
   * Reorder particular order by customer
   * @param {*} orderId
   * @param {*} customerId
   */
  static async reorder(orderId, customerId) {
    const orderExist = await this.checkOrderExist(orderId, customerId);
    if (!orderExist) {
      throw new BadRequestException("Invalid OrderId");
    }
    const orderItem = await this.getOrderItemDetails(orderId);
    orderItem.map(async (value) => {
      let repeatOrderData = {};
      repeatOrderData.storeItemId = value.storeItemId;
      repeatOrderData.quantity = value.quantity;
      const storeItem = await StoreItemService.findById(value.storeItemId);
      if (storeItem) {
        await CartService.addToCart(repeatOrderData, customerId);
      }
    });
  }

  /**
   * Cancel Particular Order
   * @param {*} orderId
   */
  static async cancelOrder(orderId, customerId, storeId) {
    const checkOrderExist = await this.checkOrderExist(
      orderId,
      customerId,
      storeId
    );
    if (!checkOrderExist) {
      throw new NotFoundException("Order Not Found");
    }
    Helper.validForCancelOrder(checkOrderExist.status);

    const orderPaymentDetails = await PaymentService.getOrderPaymentDetails(
      orderId
    );
    const storePaymentDetails =
      await PaymentService.checkStorePaymentDetailsExist(
        checkOrderExist.storeId
      );

    let paymentStatus = orderPaymentDetails.status;
    const cancelPaymentIntent = await stripe.paymentIntents
      .cancel(orderPaymentDetails.paymentIntentId, {
        stripeAccount: storePaymentDetails.accountId,
      })
      .then((result) => {
        paymentStatus = result.status;
      })
      .catch((err) => {
        paymentStatus = "canceled";
      });

    await knex("order_payment_details")
      .update("status", paymentStatus)
      .where({ orderId });

    await Helper.sendOrderPushNotificationToStore(
      ORDER_STATUS.CANCELED,
      checkOrderExist
    );

    await knex("orders")
      .update("status", ORDER_STATUS.CANCELED)
      .where("id", orderId);
  }

  /**
   *  Add order details
   * @param {*} orderData
   * @returns
   */
  static async createOrder(orderData) {
    const data = await knex("orders")
      .insert(orderData)
      .then((result) => knex("orders").where("id", result[0]).first());

    return data;
  }

  /**
   * Add order items details
   * @param {*} orderId
   * @param {*} cartItems
   */
  static async createOrderItems(orderId, cartItems) {
    console.log({ orderId, cartItems });
    const orderItems = [];
    cartItems.map(async (items) => {
      orderItems.push({
        orderId,
        storeItemId: items.storeItemId,
        quantity: items.quantity,
      });
    });

    console.log({ orderItems });

    return await knex("order_items").insert(orderItems);
  }

  /**
   *  Get order items details by id
   * @param {*} orderId
   * @returns
   */
  static async getOrderItemDetails(orderId) {
    return await knex("order_items")
      .innerJoin(
        "store_items",
        "store_items.id",
        "=",
        "order_items.storeItemId"
      )
      .where("orderId", orderId);
  }

  /**
   * Check Order Exist or Not By orderId
   * @param {*} orderId
   * @returns
   */
  static async checkOrderExist(orderId, customerId, storeId) {
    return await knex("orders")
      .where("id", orderId)
      .where((qb) => {
        if (customerId) {
          qb.where("orders.customerId", customerId);
        }
      })
      .where((qb) => {
        if (storeId) {
          qb.where("orders.storeId", storeId);
        }
      })
      .first();
  }
}

export default OrderService;

import knex from "../common/config/database.config";
import fileHelper from "../common/helper/file.helper";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DROP_DOWN,
  ORDER_STATUS,
  ROLE,
} from "../common/constant";
import OrderService from "../orders/orders.service";
import NotFoundException from "../common/exception/not-found.exception";
import Helper from "../common/helper/helper";
import StoreItemsService from "../store-items/store-items.service";
import AddressService from "../customer-addresses/customer-addresses.service";
import Stripe from "stripe";
import moment from "moment-timezone";
import moment1 from "moment";
import PaymentService from "../payments/payments.service";
import BadRequestException from "../common/exception/bad-request.exception";
import FcmHelper from "../common/helper/fcm.helper";
require("dotenv").config();
const StripeKey = process.env.STRIPE_KEY;
const stripe = Stripe(StripeKey);

class StoreService {
  /**
   * Get store list
   * @param {object} req
   * @returns
   */
  static async getStores(userId, search) {
    // const isOpen = (openTime, closeTime, timezone) => {
    //   const now = moment().tz(timezone);
    //   const storeOpenTime = moment.tz(openTime, "hh:mm:ss", timezone);
    //   const storeCloseTime = moment.tz(closeTime, "hh:mm:ss", timezone);

    //   console.log(storeOpenTime, storeCloseTime);

    //   // function tConvert(time) {
    //   //   // Check correct time format and split into components
    //   //   time = time
    //   //     .toString()
    //   //     .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    //   //   if (time.length > 1) {
    //   //     // If time format correct
    //   //     time = time.slice(1); // Remove full string match value
    //   //     time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    //   //     time[0] = +time[0] % 12 || 12; // Adjust hours
    //   //   }
    //   //   return time.join(""); // return adjusted time or original string
    //   // }

    //   return now.isBetween(storeOpenTime, storeCloseTime);
    // };

    const todayDay = new Date().getDay();

    const qb = knex("users")
      .where("role", ROLE.STORE)
      .select(
        "users.*",
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_stores WHERE favourite_stores.storeId = users.id AND userId = ?) AS isFavourite`,
          [userId]
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE storeId = users.id) AS totalRating`
        ),
        knex.raw(
          `(SELECT ROUND(AVG(rating),2) FROM feedbacks WHERE storeId = users.id) AS avgRating`
        ),
        knex.raw(
          `(SELECT id FROM stores_timing WHERE storeId = users.id AND day = CAST((DAYOFWEEK(now())-1) AS CHAR CHARACTER SET utf8)) AS storeTimingId`
        )
      )
      .orderBy("users.createdAt", "desc");

    if (search) {
      qb.where("storeName", "like", `%${search}%`);
    }

    const store = await qb;

    const newData = await Promise.all(
      store.map(async (value) => {
        let isStoreOpen = false;
        if (value.storeTimingId) {
          const timing = await knex("stores_timing")
            .select("opensAt", "closesAt")
            .where("id", value.storeTimingId)
            .andWhereRaw(
              "opensAt  <= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            )
            .andWhereRaw(
              "closesAt >= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            );

          if (timing.length > 0) {
            isStoreOpen = true;
          }
          value.isStoreOpen = isStoreOpen;
        }

        const [storeCuisine] = await knex.raw(
          `SELECT DISTINCT SUBSTRING_INDEX(SUBSTRING_INDEX(cuisineIds, ',', n), ',', -1) AS cuisine FROM store_items INNER JOIN ( SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 ) AS numbers ON n <= LENGTH(cuisineIds) - LENGTH(REPLACE(cuisineIds, ',', '')) + 1 WHERE storeId = ${value.id}`
        );

        const cuisineIds = storeCuisine.map((value) => Number(value.cuisine));

        let cuisines = await knex("dropdown_options")
          .where({ dropdownId: DROP_DOWN.CUISINE })
          .whereIn("id", cuisineIds);

        return { ...value, isStoreOpen, cuisines };
      })
    );

    return newData;
  }

  /**
   * Get store list
   * @param {*} userId
   */
  static async getStoresList(
    userId,
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE
  ) {
    const store = await knex("users")
      .where("role", ROLE.STORE)
      .select(
        "users.*",
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_stores WHERE favourite_stores.storeId = users.id AND userId = ?) AS isFavourite`,
          [userId]
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE storeId = users.id) AS totalRating`
        ),
        knex.raw(
          `(SELECT ROUND(AVG(rating),2) FROM feedbacks WHERE storeId = users.id) AS avgRating`
        ),
        knex.raw(
          `(SELECT id FROM stores_timing WHERE storeId = users.id AND day = CAST((DAYOFWEEK(now())-1) AS CHAR CHARACTER SET utf8)) AS storeTimingId`
        )
      )
      .orderBy("users.createdAt", "desc")
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });

    const newData = await Promise.all(
      store.data.map(async (value) => {
        let isStoreOpen = false;
        if (value.storeTimingId) {
          const timing = await knex("stores_timing")
            .select("opensAt", "closesAt")
            .where("id", value.storeTimingId)
            .andWhereRaw(
              "opensAt  <= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            )
            .andWhereRaw(
              "closesAt >= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            );

          if (timing.length > 0) {
            isStoreOpen = true;
          }
          value.isStoreOpen = isStoreOpen;
        }

        const [storeCuisine] = await knex.raw(
          `SELECT DISTINCT SUBSTRING_INDEX(SUBSTRING_INDEX(cuisineIds, ',', n), ',', -1) AS cuisine FROM store_items INNER JOIN ( SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 ) AS numbers ON n <= LENGTH(cuisineIds) - LENGTH(REPLACE(cuisineIds, ',', '')) + 1 WHERE storeId = ${value.id}`
        );

        const cuisineIds = storeCuisine.map((value) => Number(value.cuisine));

        let cuisines = await knex("dropdown_options")
          .where({ dropdownId: DROP_DOWN.CUISINE })
          .whereIn("id", cuisineIds);

        return { ...value, isStoreOpen, cuisines };
      })
    );

    return { data: newData, meta: store.pagination };
  }

  /**
   * Get Store Details By Id
   * @param {*} storeId
   * @returns
   */
  static async getStoreByIdForHome(storeId, userId) {
    const todayDay = new Date().getDay();

    const store = await knex("users")
      .select(
        "users.*",
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_stores WHERE favourite_stores.storeId = users.id AND userId = ?) AS isFavourite`,
          userId || null
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE feedbacks.storeId = users.id AND userId = ?) AS isReviewed`,
          userId || null
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE storeId = users.id) AS totalRating`
        ),
        knex.raw(
          `(SELECT ROUND(AVG(rating),2) FROM feedbacks WHERE storeId = users.id) AS avgRating`
        ),
        knex.raw(
          `(SELECT id FROM stores_timing WHERE storeId = users.id AND day = ${todayDay}+1) AS storeTimingId`
        )
      )
      .where("users.id", storeId)
      .where("role", ROLE.STORE);
    // .first();

    // const currentTime = new moment().format("HH:mm:ss");

    const newData = await Promise.all(
      store.map(async (value) => {
        let isStoreOpen = false;
        if (value.storeTimingId) {
          const timing = await knex("stores_timing")
            .select("opensAt", "closesAt")
            .where("id", value.storeTimingId)
            .andWhereRaw(
              "opensAt  <= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            )
            .andWhereRaw(
              "closesAt >= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            );
          // .andWhere("opensAt", "<=", currentTime)
          // .andWhere("closesAt", ">=", currentTime);

          if (timing.length > 0) {
            isStoreOpen = true;
          }
          value.isStoreOpen = isStoreOpen;
        }

        const [storeCuisine] = await knex.raw(
          `SELECT DISTINCT SUBSTRING_INDEX(SUBSTRING_INDEX(cuisineIds, ',', n), ',', -1) AS cuisine FROM store_items INNER JOIN ( SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 ) AS numbers ON n <= LENGTH(cuisineIds) - LENGTH(REPLACE(cuisineIds, ',', '')) + 1 WHERE storeId = ${value.id}`
        );

        const cuisineIds = storeCuisine.map((value) => Number(value.cuisine));

        let cuisines = await knex("dropdown_options")
          .where({ dropdownId: DROP_DOWN.CUISINE })
          .whereIn("id", cuisineIds);

        return { ...value, isStoreOpen, cuisines };
      })
    );

    return newData;
  }

  /**
   * Get Store Details By Id
   * @param {*} storeId
   * @returns
   */
  static async getStoreById(storeId, userId) {
    return await knex("users")
      .select(
        "users.*",
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_stores WHERE favourite_stores.storeId = users.id AND userId = ?) AS isFavourite`,
          userId || null
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE feedbacks.storeId = users.id AND userId = ?) AS isReviewed`,
          userId || null
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE storeId = users.id) AS totalRating`
        ),
        knex.raw(
          `(SELECT ROUND(AVG(rating),2) FROM feedbacks WHERE storeId = users.id) AS avgRating`
        )
      )
      .where("users.Id", storeId)
      .where("role", ROLE.STORE);
    // .first();
  }

  /**
   * Get store list By Sorting
   * @param {object} req
   * @returns
   */
  static async getStoreBySorting(userId, search, sort) {
    const defaultAddress = await AddressService.checkDefaultAddress(userId);

    const qb = knex("users")
      .where("role", ROLE.STORE)
      .innerJoin("store_addresses", "store_addresses.userId", "=", "users.id")
      .select(
        "users.*",
        "store_addresses.*",
        "users.id AS id",
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_stores WHERE favourite_stores.storeId = users.id AND userId = ?) AS isFavourite`,
          [userId]
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE storeId = users.id) AS totalRating`
        ),
        knex.raw(
          `(SELECT ROUND(AVG(rating),2) FROM feedbacks WHERE storeId = users.id) AS avgRating`
        ),
        knex.raw(
          "((select(ACOS( SIN((? * PI() / 180)) * SIN((latitude * PI() / 180)) + COS((? * PI() / 180)) * COS((latitude * PI() / 180)) * COS( ((? - longitude) * PI() / 180)) ) * 180 / PI() * 60 * 1.1515 * 1.609344) from store_addresses WHERE userId = users.id)) as distance",
          [
            defaultAddress.latitude,
            defaultAddress.latitude,
            defaultAddress.longitude,
          ]
        )
      );

    if (search) {
      qb.where("storeName", "like", `%${search}%`);
    }

    if (sort) {
      if (sort === "0") {
        qb.orderBy(knex.raw("distance"), "ASC");
      }
      if (sort === "1") {
        qb.orderBy("users.preparationTime", "ASC");
      }
    }

    return await qb;
  }

  /**
   * Get orders Of this Particular Store
   * @param {*} status
   * @param {*} perPage
   * @param {*} currentPage
   * @param {*} storeId
   * @returns
   */
  static async getStoreOrders(
    status = 1,
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE,
    storeId
  ) {
    const orders = await knex("orders")
      .where({ storeId })
      .where((qb) => {
        if (status === 0) {
          qb.where("status", ORDER_STATUS.PENDING);
        } else {
          qb.whereIn("status", [ORDER_STATUS.PREPARING, ORDER_STATUS.ONTHEWAY]);
        }
      })
      .orderBy("orders.createdAt", "desc")
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });

    console.log("orders", orders);

    const data = await Promise.all(
      orders.data.map(
        async (order) => await OrderService.getOrderDetails(order.id, false)
      )
    );

    console.log("orders-data", data);

    return { data, meta: orders.pagination };
  }

  /**
   * Get Previous Order Details
   * @param {*} perPage
   * @param {*} currentPage
   * @param {*} storeId
   * @returns
   */
  static async getPreviousOrders(
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE,
    storeId
  ) {
    const orders = await knex("orders")
      .where({ storeId })
      .whereIn("status", [
        ORDER_STATUS.REJECT,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.CANCELED,
      ])
      .orderBy("orders.createdAt", "desc")
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });

    const data = await Promise.all(
      orders.data.map(
        async (order) => await OrderService.getOrderDetails(order.id, false)
      )
    );
    return { data, meta: orders.pagination };
  }

  /**
   * Update Order Status By Id
   * @param {*} status
   * @param {*} orderId
   */
  static async updateStoreOrder(orderId, status = 1, storeId) {
    const orderExist = await OrderService.checkOrderExist(orderId);

    if (!orderExist) {
      throw new NotFoundException("Order Not Found");
    }

    const orderPaymentDetails = await PaymentService.getOrderPaymentDetails(
      orderId
    );
    const storePaymentDetails =
      await PaymentService.checkStorePaymentDetailsExist(storeId);

    if (!orderPaymentDetails) {
      throw new BadRequestException("Order payment details not found.");
    }

    let paymentStatus = orderPaymentDetails.status;
    let paymentFailed = false;

    if (status === ORDER_STATUS.ACCEPT) {
      status = ORDER_STATUS.PREPARING;
      // const orderPaymentDetails = await PaymentService.getOrderPaymentDetails(
      //   orderId
      // );
      // const storePaymentDetails =
      //   await PaymentService.checkStorePaymentDetailsExist(storeId);
      const confirmPaymentIntent = await stripe.paymentIntents
        .confirm(orderPaymentDetails.paymentIntentId, {
          stripeAccount: storePaymentDetails.accountId,
        })
        .then((result) => {
          paymentStatus = result.status;
        })
        .catch((err) => {
          paymentStatus = "payment failed";
          status = ORDER_STATUS.CANCELED;
          paymentFailed = true;
        });
    } else if (status === -1) {
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
    }
    await knex("order_payment_details")
      .update("status", paymentStatus)
      .where({ orderId });

    if (status == ORDER_STATUS.CANCELED && paymentFailed == true) {
      await Helper.sendOrderPushNotificationToStore(
        status,
        orderExist,
        paymentFailed
      );
    } else if (status == ORDER_STATUS.PREPARING && paymentFailed == false) {
      await Helper.sendOrderPushNotificationToStore(
        status,
        orderExist,
        paymentFailed
      );
    }

    await Helper.sendOrderStatusChangePushNotification(
      status,
      orderExist,
      paymentFailed
    );

    await knex("orders").update({ status }).where("id", orderId);
    const updatedData = [];
    updatedData.push(await OrderService.getOrderDetails(orderId, false));
    return updatedData;
  }

  /**
   * Check store is Exist or Not
   * @param {*} storeId
   * @returns
   */
  static async checkStoreExist(storeId) {
    return await knex("users")
      .where({
        id: storeId,
        Role: ROLE.STORE,
      })
      .first();
  }

  /**
   * Add search in table
   * @param {*} search
   * @param {*} userId
   */
  static async searchHistory(userId, search) {
    if (search != null) {
      await knex("search_history").insert({
        search,
        userId,
      });
    }
  }

  /**
   * Add Perparation
   * @param {*} time
   * @param {*} storeId
   */
  static async addPreparationTime(time, storeId) {
    if (time) {
      const userDetails = await knex("users")
        .where("role", ROLE.STORE)
        .where("id", storeId)
        .first();

      let profileStatus = userDetails.profileStatus;
      if (profileStatus == 1) {
        profileStatus = 2;
      }
      await knex("users")
        .update({ preparationTime: time, profileStatus })
        .where("role", ROLE.STORE)
        .where("id", storeId);
    }
  }

  /**
   * Popular Store Listing
   * @param {*} userId
   */
  static async getPopularStores(userId) {
    return await knex("users")
      .select(
        "users.*",
        knex.raw(
          "(select count(*) from favourite_stores where favourite_stores.storeId = users.id AND userId = ?) AS isFavourite",
          [userId]
        ),
        knex.raw(
          "(select  ROUND(AVG(rating),2) from feedbacks where storeId = users.id) AS avgRating"
        ),
        knex.raw(
          "(select count(*) from feedbacks where storeId = users.id) AS totalRating"
        )
      )
      .where("users.role", ROLE.STORE)
      .orderBy("avgRating", "desc");
  }

  /**
   * Check store open or not
   * @param {*} storeId
   * @returns
   */
  static async checkStoreOpenOrNot(storeId) {
    const todayDay = new Date().getDay();

    const store = await knex("users")
      .select(
        knex.raw(
          `(SELECT id FROM stores_timing WHERE storeId = users.id AND day = ${todayDay}+1) AS storeTimingId`
        )
      )
      .where({
        id: storeId,
        Role: ROLE.STORE,
      });

    const currentTime = new moment().format("HH:mm:ss");

    const newData = await Promise.all(
      store.map(async (value) => {
        let isStoreOpen = false;
        if (value.storeTimingId) {
          const timing = await knex("stores_timing")
            .select("opensAt", "closesAt")
            .where("id", value.storeTimingId)
            .andWhereRaw(
              "opensAt  <= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            )
            .andWhereRaw(
              "closesAt >= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            );
          if (timing.length > 0) {
            isStoreOpen = true;
          }
          value.isStoreOpen = isStoreOpen;
        }

        return { ...value, isStoreOpen };
      })
    );

    if (!newData[0].isStoreOpen) {
      throw new BadRequestException(
        "Store is closed currently , please do after some time."
      );
    }

    return;
  }
}

export default StoreService;

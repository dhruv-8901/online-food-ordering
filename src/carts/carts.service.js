import knex from "../common/config/database.config";
import StoreItemService from "../store-items/store-items.service";
import StoreService from "../stores/store.service";
import PaymentService from "../payments/payments.service";
import BadRequestException from "../common/exception/bad-request.exception";

class CartService {
  /**
   * Clear cart after order placed
   * @param {*} customerId
   */
  static async clearUserCart(customerId) {
    await knex("carts").where("customerId", customerId).del();
  }

  /**
   *  Add items in cart
   * @param {*} data
   * @param {*} userId
   */
  static async addToCart(data, userId) {
    const { quantity, storeItemId } = data;
    const storeItem = await StoreItemService.findById(storeItemId);
    if (!storeItem) {
      throw new BadRequestException(" store item is invalid");
    }

    await this.checkAndRemoveUserCartOfAnotherStore(userId, storeItem.storeId);

    if (quantity <= 0) {
      return await this.removeItemFromCart(storeItemId, userId);
    }

    const itemAlreadyInCart = await this.itemAlreadyInCart(userId, storeItemId);
    if (itemAlreadyInCart.length > 0) {
      await knex("carts")
        .update("quantity", quantity)
        .where("storeItemId", storeItemId)
        .where("customerId", userId);
    } else {
      await knex("carts").insert({
        ...data,
        storeId: storeItem.storeId,
        customerId: userId,
      });
    }
  }

  /**
   * Get Cart Details
   * @param {*} customerId
   * @returns
   */
  static async getCartDetails(customerId) {
    const cartData = await this.getCartItemDetailsByUserId(customerId);

    let cartAlreadyExist = false;
    if (cartData.length > 0) {
      cartAlreadyExist = true;
    }
    const cartStoreId = cartData.length ? cartData[0].storeId : 0;
    const cartStoreDetails = await StoreService.getStoreById(cartStoreId);

    const paymentData = PaymentService.calculateCartPaymentDetails(cartData);
    return {
      cartAlreadyExist,
      cartData,
      storeData: cartStoreDetails || {},
      paymentData,
    };
  }

  /**
   * Check Item is Already in cart or not
   * @param {*} customerId
   * @param {*} storeItemId
   * @returns
   */
  static async itemAlreadyInCart(customerId, storeItemId) {
    return await knex("carts")
      .where("customerId", customerId)
      .where("storeItemId", storeItemId);
  }

  /**
   *  Check existing items store and new added item store is same if not than remove existing item from cart and add new item
   * @param {*} customerId
   * @param {*} storeId
   */
  static async checkAndRemoveUserCartOfAnotherStore(customerId, storeId) {
    const oldCartExist = await knex("carts")
      .where("storeId", storeId)
      .where("customerId", customerId);

    if (!oldCartExist.length) {
      this.clearUserCart(customerId);
    }
  }

  /**
   *  Get Cart details by customer id
   * @param {*} customerId
   * @returns
   */
  static async getCartItemDetailsByUserId(customerId) {
    return await knex("carts")
      .innerJoin("store_items", "store_items.id", "=", "carts.storeItemId")
      .whereNull("store_items.deletedAt")
      .where("customerId", customerId)
      .orderBy("carts.createdAt", "asc");
  }

  /**
   * Remove Items From Cart
   * @param {*} storeItemId
   * @param {*} customerId
   * @returns
   */
  static async removeItemFromCart(storeItemId, customerId) {
    return await knex("carts").where({ storeItemId, customerId }).del();
  }

  /**
   * Check Items Is In Cart
   * @param {*} storeItemId
   * @param {*} customerId
   * @returns
   */
  static async checkItemIsInCart(storeItemId, customerId) {
    return await knex("carts").where({
      storeItemId: storeItemId,
      customerId: customerId,
    });
  }

  static async replaceCartOrNOt(customerId, storeId) {
    let replaceCart = true;
    const cartItems = await CartService.getCartItemDetailsByUserId(customerId);
    if (cartItems.length === 0) {
      replaceCart = false;
    }
    const oldCartExist = await knex("carts")
      .where("storeId", storeId)
      .where("customerId", customerId);

    if (oldCartExist.length > 0) {
      replaceCart = false;
    }
    return replaceCart;
  }
}

export default CartService;

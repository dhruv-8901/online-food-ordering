import { createCipheriv, createDecipheriv } from "crypto";
import constantsConfig from "../config/constants.config";
import { ORDER_STATUS, TAXES } from "../constant";
import BadRequestException from "../exception/bad-request.exception";
import knex from "../../common/config/database.config";
import StoreService from "../../stores/store.service";
import FcmHelper from "./fcm.helper";

const AES_ENC_KEY_BUFFER = Buffer.from(constantsConfig.AES_ENC_KEY, "hex"); // set random encryption key
const AES_IV_BUFFER = Buffer.from(constantsConfig.AES_IV, "hex"); // set random initialisation vector

class Helper {
  /**
   * encrypt value
   * @param {string} val
   * @returns
   */
  static async encrypt(val) {
    const cipher = createCipheriv(
      "aes-256-cbc",
      AES_ENC_KEY_BUFFER,
      AES_IV_BUFFER
    );
    let encrypted = cipher.update(val, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  }

  /**
   * decrypt value
   * @param {string} val
   * @returns
   */
  static async decrypt(encrypted) {
    const decipher = createDecipheriv(
      "aes-256-cbc",
      AES_ENC_KEY_BUFFER,
      AES_IV_BUFFER
    );
    const decrypted = decipher.update(encrypted, "base64", "utf8");
    return decrypted + decipher.final("utf8");
  }

  /**
   * array chunk
   * @param {array} items
   * @param {size of chunk} size
   * @returns
   */
  static async chunk(items, size) {
    const chunks = [];
    items = [].concat(...items);

    while (items.length) {
      chunks.push(items.splice(0, size));
    }

    return chunks;
  }

  /**
   *  Count and return tax value
   * @param {*} num
   * @returns
   */
  static taxValue(num) {
    const percentage = TAXES;
    const taxesAmount = parseFloat(((num / 100) * percentage).toFixed(2));
    return taxesAmount;
  }

  /**
   * set decimal limit and return
   * @param {*} num
   * @returns
   */
  static limitDecimalDigit(num) {
    return parseFloat(num.toFixed(2));
  }

  /**
   *  Generate Unique order number
   * @returns
   */
  static generateOrderNumber() {
    return Date.now() + (Math.random() * 100000).toFixed();
  }

  /**
   * Convert time in unix form
   * @param {*} date
   * @returns
   */
  static convertInUnixTimestamp(date) {
    return Math.floor(date / 1000);
  }

  /**
   *  return status from status code
   * @param {*} statusCode
   * @returns
   */
  static orderStatus(statusCode) {
    // 0-Pending, 1-order accept by store, -1 -Reject order , 2- Preparing, 3- On The Way, 4- Delivered, 5-Returned
    let status = {};
    if (statusCode === 0) {
      status = "Pending";
    } else if (statusCode === 1) {
      status = "order accept by store";
    } else if (statusCode === -1) {
      status = "Reject order";
    } else if (statusCode === 2) {
      status = "Preparing";
    } else if (statusCode === 3) {
      status = "On The Way";
    } else if (statusCode === 4) {
      status = "Delivered";
    } else {
      status = "Returned";
    }

    return status;
  }

  /**
   * Get feedback filter option and their order
   * @param {string} filter
   * @returns
   */
  static feedbackFilterOption(filter) {
    let feedbackFilter = {};
    if (filter === "1") {
      feedbackFilter.row = "feedbacks.rating";
      feedbackFilter.order = "desc";
    } else if (filter === "2") {
      feedbackFilter.row = "feedbacks.rating";
      feedbackFilter.order = "asc";
    } else {
      feedbackFilter.row = "feedbacks.createdAt";
      feedbackFilter.order = "desc";
    }

    return feedbackFilter;
  }

  static checkStatus(status) {
    const allowStatus = [0, 1, -1, 2, 3, 4, 5];
    if (!allowStatus.includes(status)) {
      throw new BadRequestException("Status not allow");
    }
  }

  static validForCancelOrder(status) {
    if (status === ORDER_STATUS.DELIVERED) {
      throw new BadRequestException("Order Is Already Deliverd");
    } else if (status === ORDER_STATUS.ONTHEWAY) {
      throw new BadRequestException("Order Is On The Way");
    } else if (status === ORDER_STATUS.CANCELED) {
      throw new BadRequestException("Order is Already Canceled");
    } else {
      return;
    }
  }

  /**
   * send Order PushNotification To Store
   * @param {*} status
   * @param {*} orderData
   * @returns
   */
  static async sendOrderPushNotificationToStore(
    status,
    orderData,
    paymentFail
  ) {
    const tokens = await knex("fcm_tokens")
      .pluck("token")
      .where("userId", orderData.storeId)
      .groupBy("token");

    const payload = {
      notification: {
        title: "",
        body: "",
      },
      data: {
        orderId: orderData.id.toString(),
      },
    };

    if (status === ORDER_STATUS.PENDING) {
      (payload.notification.title = "New Order"),
        (payload.notification.body = "New Order Is arrived , Check The Order.");
      payload.data.type = ORDER_STATUS.PENDING.toString();
    } else if (status === ORDER_STATUS.CANCELED && paymentFail == true) {
      (payload.notification.title = "Order cancelled"),
        (payload.notification.body = `Order is cancelled due to payment failed!`);
      payload.data.type = ORDER_STATUS.CANCELED.toString();
    } else if (status === ORDER_STATUS.PREPARING && paymentFail == false) {
      (payload.notification.title = "Payment"),
        (payload.notification.body = "Payment is received");
      payload.data.type = ORDER_STATUS.PREPARING.toString();
    } else if (status === ORDER_STATUS.CANCELED) {
      (payload.notification.title = "Order cancelled"),
        (payload.notification.body = "Order is cancelled");
      payload.data.type = ORDER_STATUS.CANCELED.toString();
    } else {
      return;
    }

    await FcmHelper.sendNotification(tokens, payload);
  }

  /**
   * send Order Status Change PushNotification to user
   * @param {*} status
   * @param {*} orderData
   * @returns
   */
  static async sendOrderStatusChangePushNotification(
    status,
    orderData,
    paymentFail
  ) {
    const tokens = await knex("fcm_tokens")
      .pluck("token")
      .where("userId", orderData.customerId)
      .groupBy("token");

    const storeInfo = await StoreService.checkStoreExist(orderData.storeId);

    const payload = {
      notification: {
        title: "",
        body: "",
      },
      data: {
        orderId: orderData.id.toString(),
      },
    };

    if (status === ORDER_STATUS.DELIVERED) {
      (payload.notification.title = "Order delivered"),
        (payload.notification.body =
          "Order has been delivered , enjoy your food.");
      payload.data.type = ORDER_STATUS.DELIVERED.toString();
    } else if (status === ORDER_STATUS.PREPARING) {
      (payload.notification.title = "Order confirmed"),
        (payload.notification.body = `${storeInfo.storeName} has started preparing your order.`);
      payload.data.type = ORDER_STATUS.PREPARING.toString();
    } else if (status === ORDER_STATUS.ONTHEWAY) {
      (payload.notification.title = "Order is on the way"),
        (payload.notification.body =
          "Order has been picked up and deliver to you soon.");
      payload.data.type = ORDER_STATUS.ONTHEWAY.toString();
    } else if (status === ORDER_STATUS.REJECT) {
      (payload.notification.title = "Order is decline!"),
        (payload.notification.body = `${storeInfo.storeName} has decline your order, your refund will be initiated soon!`);
      payload.data.type = ORDER_STATUS.REJECT.toString();
    } else if (status === ORDER_STATUS.CANCELED && paymentFail == true) {
      (payload.notification.title = "Payment Failed!"),
        (payload.notification.body = `Your payment is failed, refund will be initiated soon if money deduct from your account!`);
      payload.data.type = ORDER_STATUS.CANCELED.toString();
    } else {
      return;
    }

    await FcmHelper.sendNotification(tokens, payload);
  }
}

export default Helper;

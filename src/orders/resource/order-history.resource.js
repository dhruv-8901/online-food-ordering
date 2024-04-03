import constantsConfig from "../../common/config/constants.config";
import Helper from "../../common/helper/helper";

export default class OrderHistory {
  constructor(data) {
    return data.map((items) => ({
      orderId: items.orderId,
      orderNumber: items.orderNumber,
      storeId: items.storeid,
      storeName: items.storename,
      storeImage: items.storeImage
        ? constantsConfig.baseUrl(items.storeImage)
        : null,
      storeAddress: items.storeAddress,
      status: items.status,
      paymentStatus: items.paymentStatus ? items.paymentStatus : null,
      orderTime: Helper.convertInUnixTimestamp(items.orderTime),
      grandTotal: items.grandTotal,
      items: items.items.map((value) => ({
        id: value.id,
        quantity: value.quantity,
        name: value.name,
        image: value.image ? constantsConfig.baseUrl(value.image) : null,
        categoryId: +value.categoryId,
      })),
    }));
  }
}

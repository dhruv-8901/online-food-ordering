import constantsConfig from "../../common/config/constants.config";
import Helper from "../../common/helper/helper";

export default class OrderModel {
  constructor(data) {
    (this.orderId = data.orderId),
      (this.orderNumber = data.orderNumber),
      (this.orderingInstruction = data.orderingInstruction),
      (this.status = data.status),
      (this.paymentStatus = data.paymentStatus),
      ((this.paymentMethod = data.paymentMethod ? data.paymentMethod : {}),
      (this.store = {
        name: data.storename,
        image: data.storeImage
          ? constantsConfig.baseUrl(data.storeImage)
          : null,
        totalRating: data.totalRating || 0,
        avgRating: data.avgRating || 0,
      })),
      (this.customer = {
        latitude: data.customerLatitude,
        longitude: data.customerLongitude,
        addressLine1: data.customerAddressLine1,
        addressLine2: data.customerAddressLine2,
        firstName: data.customerFirstName,
        lastName: data.customerLastName,
        phone: data.customerPhone,
      });
    (this.orderTime = Helper.convertInUnixTimestamp(data.orderTime)),
      (this.total = data.total),
      (this.taxes = data.charges),
      (this.grandTotal = data.grandTotal),
      (this.items = data.items.map((value) => ({
        id: value.id,
        quantity: value.quantity,
        name: value.name,
        image: value.image ? constantsConfig.baseUrl(value.image) : null,
        price: value.price,
        categoryId: +value.categoryId,
      })));
  }
}

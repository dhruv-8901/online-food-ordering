import constantsConfig from "../../common/config/constants.config";
import Helper from "../../common/helper/helper";

export default class StoreOrder {
  constructor(data) {
    return data.map((items) => ({
      orderId: items.orderId,
      orderNumber: items.orderNumber,
      status: items.status,
      paymentStatus: items.paymentStatus,
      orderingInstruction: items.orderingInstruction,
      orderTime: Helper.convertInUnixTimestamp(items.orderTime),
      grandTotal: items.grandTotal,
      customers: {
        latitude: items.customerLatitude,
        longitude: items.customerLongitude,
        addressLine1: items.customerAddressLine1,
        addressLine2: items.customerAddressLine2,
        firstName: items.customerFirstName,
        lastName: items.customerLastName,
        phone: items.customerPhone,
      },
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

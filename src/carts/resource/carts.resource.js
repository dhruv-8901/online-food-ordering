import constantsConfig from "../../common/config/constants.config";

export default class CartModel {
  constructor(data) {
    (this.cartAlreadyExist = data.cartAlreadyExist),
      (this.orderingEstimatedTime = "29"),
      (this.items = data.cartData.map((value) => ({
        storeItemId: value.storeItemId,
        customerId: value.customerId,
        storeId: value.storeId,
        name: value.name,
        categoryId: +value.categoryId,
        image: value.image ? constantsConfig.baseUrl(value.image) : null,
        price: value.price,
        quantity: value.quantity,
      }))),
      (this.store = data.storeData.map((value) => ({
        storeName: value.storeName,
        profileImage: value.profileImage
          ? constantsConfig.baseUrl(value.profileImage)
          : null,
        totalRating: value.totalRating,
        avgRating: value.avgRating,
      }))),
      // (this.store =
      //   Object.keys(data.storeData).length > 0
      //     ? {
      //         storeName: data.storeData.storeName || null,
      //         profileImage: data.storeData.profileImage
      //           ? constantsConfig.baseUrl(data.storeData.profileImage)
      //           : null,
      //         totalRating: data.storeData.totalRating || 0,
      //         avgRating: data.storeData.avgRating || 0,
      //       }
      //     : {});
      (this.payment = data.paymentData);
  }
}

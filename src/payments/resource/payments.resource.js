
export default class CartModel {
  constructor(data) {
    this.cartData = data.cartData.map((value) => ({
      id: value.id,
      customerId: value.customerId,
      storeId: value.storeId,
      storeItemId: value.storeItemId,
      name : value.name,
      image : value.image,
      price : value.price,
      quantity: value.quantity,
    })),
    this.storeData = data.storeData.map((value) => ({
      id: value.id,
      storeName: value.storeName,
      profileImage: value.profileImage,
      totalRating : value.totalRating,
      avgRating: value.avgRating,
    })),
    this.itemTotal = data.itemTotal,
    this.taxes = data.taxes,
    this.grandTotal = data.grandTotal
  }
}



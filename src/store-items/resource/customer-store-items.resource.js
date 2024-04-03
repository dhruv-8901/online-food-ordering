import constantsConfig from "../../common/config/constants.config";

export default class customerStoreItemModel {
  constructor(data) {
    return data.map((items) => ({
      storeItemId: items.id,
      name: items.name,
      description: items.description,
      price: items.price,
      categoryId: +items.categoryId,
      image: items.image ? constantsConfig.baseUrl(items.image) : null,
      isSpecial: Boolean(items.isSpecial),
      isFavourite: Boolean(items.isFavourite),
      cartQuantity: items.itemInCartQuantity || 0,
      orderingType: "Free",
      orderingEstimatedTime: "15-20",
      cuisines: items.cuisines.map((value) => ({
        id: value.id,
        name: value.name,
      })),
    }));
  }
}

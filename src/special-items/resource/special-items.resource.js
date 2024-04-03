import constantsConfig from "../../common/config/constants.config";

export default class StoreItemModel {
  constructor(data) {
    return data.map((items) => ({
      specialItemId: items.id,
      storeId: items.storeId,
      name: items.name,
      description: items.description,
      price: items.price,
      categoryId: +items.categoryId,
      image: items.image ? constantsConfig.baseUrl(items.image) : null,
      // isSpecial: Boolean(items.isSpecial),
      // isFavourite: Boolean(items.isFavourite),
      cuisines: items.cuisines.map((value) => ({
        id: value.id,
        name: value.name,
      })),
    }));
  }
}

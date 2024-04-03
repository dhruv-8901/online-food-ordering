import constantsConfig from "../../common/config/constants.config";

export default class StoreItemByCuisineIdModel {
  constructor(data) {
    return data.map((items) => ({
      storeItemId: items.id,
      storeId: items.storeId,
      name: items.name,
      description: items.description,
      price: items.price,
      // categoryId: +items.categoryId,
      categoryName: items.categoryName,
      image: items.image ? constantsConfig.baseUrl(items.image) : null,
      isSpecial: Boolean(items.isSpecial),
      isFavourite: Boolean(items.isFavourite),
    }));
  }
}

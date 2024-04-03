import constantsConfig from "../../common/config/constants.config";

export default class FavouriteSpecialItemModel {
  constructor(data) {
    return data.map((items) => ({
      type: items.type,
      specialItemId: items.id,
      storeId: items.storeId,
      storeName: items.storeName,
      name: items.name,
      description: items.description,
      price: items.price,
      categoryName: items.categoryName,
      image: items.image ? constantsConfig.baseUrl(items.image) : null,
    }));
  }
}

import constantsConfig from "../../common/config/constants.config";

export default class SearchHistoryModel {
  constructor(data) {
    return data.map((items) => ({
      type: items.type,
      searchId: items.searchId,
      storeItemId: items.storeItemId || null,
      storeItemName: items.storeItemName || null,
      storeItemImage: items.storeItemImage
        ? constantsConfig.baseUrl(items.storeItemImage)
        : null,
      storeId: items.storeId || null,
      storeName: items.storeName || null,
      storeImage: items.storeImage
        ? constantsConfig.baseUrl(items.storeImage)
        : null,
    }));
  }
}

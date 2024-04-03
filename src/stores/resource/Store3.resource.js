import constantsConfig from "../../common/config/constants.config";

export default class LatestStoreDeatilsModel {
  constructor(data) {
    return data.map((items) => ({
      storeId: items.id,
      name: items.storeName,
      email: items.email,
      phone: items.phone,
      profileImage: items.profileImage
        ? constantsConfig.baseUrl(items.profileImage)
        : null,
      bgImage: items.bgImage ? constantsConfig.baseUrl(items.bgImage) : null,
      address: items.address,
      isFavourite: Boolean(items.isFavourite),
      avgRating: items.avgRating || 0,
      totalRating: items.totalRating || 0,
      isStoreOpen: items.isStoreOpen,
    }));
  }
}

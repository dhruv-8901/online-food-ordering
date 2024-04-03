import constantsConfig from "../../common/config/constants.config";

export default class FavouriteStoreModel {
  constructor(favourite) {
    return favourite.map((data) => ({
      type: data.type,
      storeId: data.id,
      storeName: data.storeName,
      email: data.email,
      phone: data.phone,
      profileImage: data.profileImage
        ? constantsConfig.baseUrl(data.profileImage)
        : null,
    }));
  }
}

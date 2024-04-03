import constantsConfig from "../../../common/config/constants.config";

export default class StoreAdminModel {
  constructor(data) {
    return data.map((items) => ({
      id: items.id ? items.id : "",
      storeName: items.storeName ? items.storeName : "",
      email: items.email ? items.email : "",
      phone: items.phone ? items.phone : "",
      profileImage: items.profileImage
        ? items.profileImage
        : null,
      createdAt: items.createdAt,
    }));
  }
}

import constantsConfig from "../../../common/config/constants.config";

export default class StoreModalModel {
  constructor(data) {
    (this.id = data.id),
      (this.firstName = data.firstName || ""),
      (this.lastName = data.lastName || ""),
      (this.storeName = data.storeName || ""),
      (this.email = data.email || ""),
      (this.phone = data.phone || ""),
      // (this.storeName = data.storeName),
      (this.profileImage = data.profileImage ? data.profileImage : null);
  }
}

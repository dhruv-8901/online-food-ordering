import moment from "moment";
import constantsConfig from "../../common/config/constants.config";

export default class StoreLoginModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.profileImage = data.profileImage
      ? constantsConfig.baseUrl() + "/" + data.profileImage
      : null;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.address = data.address;
    this.authentication = data.authentication;
  }
}

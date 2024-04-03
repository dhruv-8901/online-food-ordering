import constantsConfig from "../../common/config/constants.config";

export default class UserModel {
  constructor(data) {
    this.userId = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.storeName = data.storeName;
    this.phone = data.phone;
    this.email = data.email;
    this.profileImage = data.profileImage
      ? constantsConfig.baseUrl(data.profileImage)
      : null;
    this.bgImage = data.bgImage ? constantsConfig.baseUrl(data.bgImage) : null;
    this.storeCountryCode = data.storeCountryCode;
    this.storeContactNumber = data.storeContactNumber;
    this.role = data.role;
    (this.avgRating = data.avgRating || 0),
      (this.totalRating = data.totalRating || 0),
      (this.profileStatus = data.profileStatus);
    this.isApproved = data.isApproved;
    this.isPaymentDetails = data.isPaymentDetails;
    this.isDetailsSkip = data.isDetailsSkip ? true : false;
    this.isAddressSkip = data.isAddressSkip ? true : false;
    this.defaultAddress = data.defaultAddress ? data.defaultAddress : null;
    this.authentication = data.authentication;
  }
}

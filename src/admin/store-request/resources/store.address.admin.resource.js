export default class StoreAddressAdminModel {
  constructor(data) {
    this.addressId = data.id || "";
    this.addressLine1 = data.addressLine1 || "";
    this.addressLine2 = data.addressLine2 || "";
    this.addressType = data.addressType || "";
    this.isDefault = data.isDefault ? true : false;
    this.latitude = data.latitude || "";
    this.longitude = data.longitude || "";
  }
}

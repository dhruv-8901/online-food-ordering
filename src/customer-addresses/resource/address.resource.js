export default class AddressModel {
  constructor(data) {
    this.addressId = data.id || null;
    this.addressLine1 = data.addressLine1 || null;
    this.addressLine2 = data.addressLine2 || null;
    this.addressType = data.addressType || null;
    this.isDefault = data.isDefault ? true : false;
    this.latitude = data.latitude || null;
    this.longitude = data.longitude || null;
  }
}

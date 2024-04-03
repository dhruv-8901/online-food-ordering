import constantsConfig from "../../../common/config/constants.config";

export default class CustomersAdminModel {
  constructor(data) {
    return data.map((items) => ({
      id: items.id ? items.id : "",
      firstName: items.firstName ? items.firstName : "",
      lastName: items.lastName ? items.lastName : "",
      email: items.email ? items.email : "",
      phone: items.phone ? items.phone : "",
      profileImage: items.profileImage ? items.profileImage : null,
      createdAt: items.createdAt,
    }));
  }
}

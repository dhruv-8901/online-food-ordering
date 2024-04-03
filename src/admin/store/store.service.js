import moment from "moment";
import knex from "../../common/config/database.config";
import { ROLE } from "../../common/constant";
import UserService from "../../users/user.service";

// resource
import UserResource from "../../users/resource/user.resource";
import AddressResource from "../../customer-addresses/resource/address.resource";
import AddressService from "../../customer-addresses/customer-addresses.service";
import StoreAdminModel from "../store-request/resources/store.admin.resource";
import StoreAddressAdminModel from "../store-request/resources/store.address.admin.resource";
import CustomersAdminModel from "../customers/resources/customer.admin.resource";
import StoreModalModel from "../store-request/resources/store.modal.resource";

class StoreService {
  /**
   * Get Store List
   * @param {*} req
   * @returns
   */
  static async getStore(req) {
    const data = await knex("users")
      .select("id", "storeName", "email", " phone", "profileImage", "createdAt")
      .where("role", ROLE.STORE)
      .where((qb) => {
        if (req.query.status === "1" || req.query.status === "2") {
          qb.where("isApproved", req.query.status);
        } else {
          qb.whereIn("isApproved", [1, 2]);
        }
      });

    return {
      draw: parseInt(req.query.draw),
      recordsTotal: 5,
      recordsFiltered: 5,
      data: new StoreAdminModel(data),
    };
  }

  /**
   * Get Store By Id
   * @param {*} req
   * @returns
   */
  static async getStoreById(req) {
    const store = await UserService.find(req.params.id);
    const user = new StoreModalModel(store);
    if (store.role === ROLE.STORE) {
      user.defaultAddress = new StoreAddressAdminModel(
        await AddressService.storeAddress(req.params.id)
      );
    }
    return user;
  }

  /**
   * Get Store Request List
   * @param {*} req
   * @returns
   */
  static async storeApproveOrReject(storeId, action) {
    return await knex("users")
      .where("id", storeId)
      .update("isApproved", action);
  }
}

export default StoreService;

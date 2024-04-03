import moment from "moment";
import knex from "../../common/config/database.config";
import { ROLE } from "../../common/constant";
import UserService from "../../users/user.service";

// resource
import UserResource from "../../users/resource/user.resource";
import AddressResource from "../../customer-addresses/resource/address.resource";
import AddressService from "../../customer-addresses/customer-addresses.service";

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
      .where("isApproved", 1);
    return {
      draw: parseInt(req.query.draw),
      recordsTotal: 5,
      recordsFiltered: 5,
      data: data,
    };
  }

  /**
   * Get Store By Id
   * @param {*} req
   * @returns
   */
  static async getStoreById(req) {
    const user = await UserService.find(req.params.id);
    if (user.role === ROLE.STORE) {
      user.defaultAddress = new AddressResource(
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

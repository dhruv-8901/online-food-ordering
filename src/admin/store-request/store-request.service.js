import moment from "moment";
import knex from "../../common/config/database.config";
import { ROLE } from "../../common/constant";
import StoreAdminModel from "./resources/store.admin.resource";

class StoreService {
  /**
   * Get Store Request List
   * @param {*} req
   * @returns
   */
  static async getStoreRequest(req) {
    const data = await knex("users")
      .select("id", "storeName", "email", " phone", "profileImage", "createdAt")
      .where("role", ROLE.STORE)
      .where("isApproved", 3);
    return {
      draw: parseInt(req.query.draw),
      recordsTotal: 5,
      recordsFiltered: 5,
      data: new StoreAdminModel(data),
    };
  }
}

export default StoreService;

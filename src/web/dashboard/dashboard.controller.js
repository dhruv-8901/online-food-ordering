import knex from "../../common/config/database.config";
import { ORDER_STATUS, ROLE } from "../../common/constant";

class DashboardController {
  /**
   * Show dashboard
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async index(req, res) {
    const customers = await knex("users")
      .where("role", ROLE.CUSTOMER)
      .count("id", { as: "customers" });
    const totalOrders = await knex("orders").count("id", { as: "totalOrders" });
    const pendingOrders = await knex("orders")
      .whereIn("status", [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.ACCEPT,
        ORDER_STATUS.PREPARING,
        ORDER_STATUS.ONTHEWAY,
      ])
      .count("id", { as: "pendingOrders" });
    const completeOrders = await knex("orders")
      .where("status", ORDER_STATUS.DELIVERED)
      .count("id", { as: "completeOrders" });
    return res.render("admin/dashboard", {
      page: "dashboard",
      customers: customers[0].customers,
      totalOrders: totalOrders[0].totalOrders,
      pendingOrders: pendingOrders[0].pendingOrders,
      completeOrders: completeOrders[0].completeOrders,
    });
  }
}

export default DashboardController;

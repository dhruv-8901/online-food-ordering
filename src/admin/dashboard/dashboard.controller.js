import knex from "../../common/config/database.config";
import { APPROVED_STATUS, ORDER_STATUS, ROLE } from "../../common/constant";

class DashboardController {
  /**
   * Show dashboard
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async index(req, res) {
    const allRecords = await knex("users")
      .select(
        knex.raw(
          `(SELECT  count(*) id   FROM users WHERE role = ? ) AS customers`,
          [ROLE.CUSTOMER] || null
        ),
        knex.raw(
          "(SELECT COUNT(*) id FROM users WHERE role = ? ) AS stores",
          ROLE.STORE || null
        ),
        knex.raw(
          "(SELECT COUNT(*) id FROM users WHERE role = ? AND isApproved = ? ) AS pendingStores",
          [ROLE.STORE, APPROVED_STATUS.PENDING] || null
        ),
        knex.raw(
          "(SELECT COUNT(*) id FROM users WHERE role = ? AND isApproved = ? ) AS approvedStores",
          [ROLE.STORE, APPROVED_STATUS.APPROVED] || null
        ),
        knex.raw(
          "(SELECT COUNT(*) id FROM users WHERE role = ? AND isApproved = ? ) AS rejectStores",
          [ROLE.STORE, APPROVED_STATUS.REJECTED] || null
        ),
        knex.raw("(SELECT COUNT(*) id FROM orders) AS totalOrders"),
        knex.raw(
          `(SELECT COUNT(*) id FROM orders where status in (${[
            ORDER_STATUS.PENDING,
            ORDER_STATUS.ACCEPT,
            ORDER_STATUS.PREPARING,
            ORDER_STATUS.ONTHEWAY,
          ]})) AS pendingOrders`
        ),
        knex.raw(
          "(SELECT COUNT(*) id FROM orders WHERE status = ?) AS completeOrders",
          ORDER_STATUS.DELIVERED || null
        )
      )
      .first();

    // const customers = await knex("users")
    //   .where("role", ROLE.CUSTOMER)
    //   .count("id", { as: "customers" });
    // const totalOrders = await knex("orders").count("id", { as: "totalOrders" });
    // const pendingOrders = await knex("orders")
    //   .whereIn("status", [
    //     ORDER_STATUS.PENDING,
    //     ORDER_STATUS.ACCEPT,
    //     ORDER_STATUS.PREPARING,
    //     ORDER_STATUS.ONTHEWAY,
    //   ])
    //   .count("id", { as: "pendingOrders" });
    // const completeOrders = await knex("orders")
    //   .where("status", ORDER_STATUS.DELIVERED)
    //   .count("id", { as: "completeOrders" });
    // const stores = await knex("users")
    //   .where("role", ROLE.STORE)
    //   .count("id", { as: "stores" });
    // const pendingStores = await knex("users")
    //   .where("role", ROLE.STORE)
    //   .where("isApproved", APPROVED_STATUS.PENDING)
    //   .count("id", { as: "pendingStores" });
    // const approvedStores = await knex("users")
    //   .where("role", ROLE.STORE)
    //   .where("isApproved", APPROVED_STATUS.APPROVED)
    //   .count("id", { as: "approvedStores" });
    // const rejectStores = await knex("users")
    //   .where("role", ROLE.STORE)
    //   .where("isApproved", APPROVED_STATUS.REJECTED)
    //   .count("id", { as: "rejectStores" });
    // const comman = await this.commanService("users");

    // commanService = async (table, query, count) => {
    //   return await knex(table);
    // };

    return res.render("admin/dashboard", {
      page: "dashboard",
      customers: allRecords.customers,
      totalOrders: allRecords.totalOrders,
      pendingOrders: allRecords.pendingOrders,
      completeOrders: allRecords.completeOrders,
      stores: allRecords.stores,
      pendingStores: allRecords.pendingStores,
      approvedStores: allRecords.approvedStores,
      rejectStores: allRecords.rejectStores,
      // customers: customers[0].customers,
      // totalOrders: totalOrders[0].totalOrders,
      // pendingOrders: pendingOrders[0].pendingOrders,
      // completeOrders: completeOrders[0].completeOrders,
      // stores: stores[0].stores,
      // pendingStores: pendingStores[0].pendingStores,
      // approvedStores: approvedStores[0].approvedStores,
      // rejectStores: rejectStores[0].rejectStores,
    });
  }
}

export default DashboardController;

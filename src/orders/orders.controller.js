import OrderService from "./orders.service";
import OrderModel from "./resource/orders.resource";
import role from "../common/middleware/role";
import OrderHistoryModel from "./resource/order-history.resource";
import { ROLE } from "../common/constant";

class OrderController {
  /**
   *  order placed
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async placeOrder(req, res) {
    const orderId = await OrderService.placeOrder(
      req.user.id,
      req.body.addressId,
      req.body.orderingInstruction,
      req.body.cardId
    );
    return res.send({ message: "success", data: { orderId } });
  }

  /**
   *  Get Specific order details by id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getOrderDetails(req, res) {
    const data = await OrderService.getOrderDetails(req.params.id);
    return res.send({ data: new OrderModel(data) });
  }

  /**
   * Get  customer order history
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getOrderHistory(req, res) {
    const { data, meta } = await OrderService.getOrderHistory(
      req.query.perPage,
      req.query.currentPage,
      req.user.id
    );
    return res.send({ data: new OrderHistoryModel(data), meta });
  }

  /**
   * Cancel particular order by customer
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async cancelOrder(req, res) {
    if (req.user.role === ROLE.STORE) {
      await OrderService.cancelOrder(req.body.orderId, undefined, req.user.id);
    } else {
      await OrderService.cancelOrder(req.body.orderId, req.user.id);
    }
    return res.send({ message: "Order Cancel Succesfully" });
  }

  /**
   * Reorder particular order by customer
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async reorder(req, res) {
    await OrderService.reorder(req.body.orderId, req.user.id);
    return res.send({ message: "Success" });
  }
}

export default OrderController;

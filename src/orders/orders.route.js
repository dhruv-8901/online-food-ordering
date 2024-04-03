import express from "express";
import asyncHandler from "express-async-handler";
import { ROLE } from "../common/constant";
import role from "../common/middleware/role";
import OrderController from "./orders.controller";
import validator from "../common/config/validator.config";
import orderDto from "./dto/orders.dto";
import orderCancelDto from "./dto/order-cancel.dto";
import checkCustomerPaymentDetails from "../common/middleware/check-customer-payment-details";

const router = express.Router();

/**
 * Get Customer Order History
 */
router.get(
  "/history",
  role([ROLE.CUSTOMER]),
  asyncHandler(OrderController.getOrderHistory)
);

/**
 *  cancel order
 */
router.post(
  "/cancel",
  role([ROLE.STORE, ROLE.CUSTOMER]),
  validator.body(orderCancelDto),
  asyncHandler(OrderController.cancelOrder)
);

/**
 *  Reorder
 */
router.post(
  "/reorder",
  role([ROLE.CUSTOMER]),
  validator.body(orderCancelDto),
  asyncHandler(OrderController.reorder)
);

/**
 *  order placed
 */
router.post(
  "/",  
  role([ROLE.CUSTOMER]),
  validator.body(orderDto),
  checkCustomerPaymentDetails(),
  asyncHandler(OrderController.placeOrder)
);

/**
 * Get specific order by id
 */
router.get(
  "/:id",
  role([ROLE.STORE, ROLE.CUSTOMER]),
  asyncHandler(OrderController.getOrderDetails)
);

export default router;

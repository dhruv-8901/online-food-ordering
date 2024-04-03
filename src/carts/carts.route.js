import express from "express";
import asyncHandler from "express-async-handler";
import { ROLE } from "../common/constant";
import role from "../common/middleware/role";
import CartController from "./carts.controller";
import validator from "../common/config/validator.config";
import cartDto from "./dto/cart.dto";
import checkStoreOpen from "../common/middleware/check-store-open";

const router = express.Router();

/**
 * Is Cart Exist Or Not
 */
router.get(
  "/isCartExist",
  role([ROLE.CUSTOMER]),
  asyncHandler(CartController.isCartExist)
);

/**
 * Add items in cart
 */
router.post(
  "/",
  role([ROLE.CUSTOMER]),
  validator.body(cartDto),
  checkStoreOpen(),
  asyncHandler(CartController.addToCart)
);

/**
 * Get cart details
 */
router.get(
  "/",
  role([ROLE.CUSTOMER]),
  asyncHandler(CartController.getCartDetails)
);

export default router;

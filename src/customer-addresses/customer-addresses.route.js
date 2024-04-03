import express from "express";
import asyncHandler from "express-async-handler";
import validator from "../common/config/validator.config";
import { ROLE } from "../common/constant";
import role from "../common/middleware/role";
import AddressController from "./customer-addresses.controller";
import storeAddressDto from "./dtos/store-address.dto";

const router = express.Router();

/**
 * User addresses
 */
router.get("/", role([ROLE.CUSTOMER]), asyncHandler(AddressController.getAddress));

/**
 * Add user address
 */
router.post(
  "/",
  role([ROLE.CUSTOMER]),
  validator.body(storeAddressDto.body),
  asyncHandler(AddressController.store)
);

/**
 * Update user address
 */
router.put(
  "/:addressId",
  role([ROLE.CUSTOMER]),
  validator.params(storeAddressDto.params),
  validator.body(storeAddressDto.body),
  asyncHandler(AddressController.update)
);

/**
 * Delete user addresses
 */
router.delete(
  "/:addressId",
  role([ROLE.CUSTOMER]),
  validator.params(storeAddressDto.params),
  asyncHandler(AddressController.delete)
);

export default router;

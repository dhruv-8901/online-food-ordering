import express from "express";
import SpecialItemsController from "./special-items.controller";
import asyncHandler from "express-async-handler";
import validator from "../common/config/validator.config";


// Validation
import postStoreItemDto from "./dto/store-items.dto";
import getStoreItemDto from "./dto/get-store-items.dto";
import role from "../common/middleware/role";
import checkStoreAddress from "../common/middleware/check-store-address";
import { ROLE } from "../common/constant";

const router = express.Router();

/**
 * Store Items listing
 */
router.get(
  "/",
  role([ROLE.STORE]),
  // validator.query(getStoreItemDto),
  asyncHandler(SpecialItemsController.getItems)
);

/**
 * Add Store Item
 */
router.post(
  "/",
  role([ROLE.STORE]),
  checkStoreAddress(),
  validator.body(postStoreItemDto),
  asyncHandler(SpecialItemsController.addItem)
);

// /**
//  * Update Store Item
//  */
// router.put(
//   "/:id",
//   role([ROLE.STORE]),
//   validator.body(postStoreItemDto),
//   asyncHandler(SpecialItemsController.updateItem)
// );

// /**
//  * Delete Store Items
//  */
// router.delete(
//   "/:ids",
//   role([ROLE.STORE]),
//   asyncHandler(SpecialItemsController.deleteItems)
// );

// /**
//  * Get store items by cuisine [User]
//  */
// router.get(
//   "/:cuisineId",
//   role([ROLE.CUSTOMER]),
//   asyncHandler(SpecialItemsController.getItemsByCuisineId)
// );

export default router;

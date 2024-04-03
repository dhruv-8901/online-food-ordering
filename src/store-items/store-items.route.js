import express from "express";
import StoreItemsController from "./store-items.controller";
import asyncHandler from "express-async-handler";
import validator from "../common/config/validator.config";


// Validation
import postStoreItemDto from "./dto/store-items.dto";
import getStoreItemDto from "./dto/get-store-items.dto";
import reusePreviousSpecialItemDto from "./dto/reuse-special-items.dto";
import role from "../common/middleware/role";
import checkStoreAddress from "../common/middleware/check-store-address";
import { ROLE } from "../common/constant";
import checkStorePaymentDetails from "../common/middleware/check-store-payment-details";

const router = express.Router();


/**
 * Store Items listing
 */
router.get(
  "/previous-specials",
  role([ROLE.STORE]),
  validator.query(getStoreItemDto),
  asyncHandler(StoreItemsController.getPreviousSpecialItem)
);


/**
 * Store Items listing
 */
router.post(
  "/reuse-previous-specials",
  role([ROLE.STORE]),
  validator.body(reusePreviousSpecialItemDto),
  asyncHandler(StoreItemsController.reusePreviousSpecialItem)
);


/**
 * Store Items listing
 */
router.get(
  "/",
  role([ROLE.STORE]),
  validator.query(getStoreItemDto),
  asyncHandler(StoreItemsController.getItems)
);

/**
 * Add Store Item
 */
router.post(
  "/",
  role([ROLE.STORE]),
  checkStoreAddress(),
  checkStorePaymentDetails(),
  validator.body(postStoreItemDto),
  asyncHandler(StoreItemsController.addItem)
);

/**
 * Update Store Item
 */
router.put(
  "/:id",
  role([ROLE.STORE]),
  validator.body(postStoreItemDto),
  asyncHandler(StoreItemsController.updateItem)
);

/**
 * Delete Store Items
 */
router.delete(
  "/:ids",
  role([ROLE.STORE]),
  asyncHandler(StoreItemsController.deleteItems)
);

/**
 * Get store items by cuisine [User]
 */
router.get(
  "/:cuisineId",
  role([ROLE.CUSTOMER]),
  asyncHandler(StoreItemsController.getItemsByCuisineId)
);




export default router;

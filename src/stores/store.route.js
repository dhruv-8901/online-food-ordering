import express from "express";
import asyncHandler from "express-async-handler";
import { ROLE } from "../common/constant";
import role from "../common/middleware/role";
import validator from "../common/config/validator.config";
import OrderController from "../orders/orders.controller";
import storeOrderUpdateDto from "./dto/store-order-update.dto";
import storeOrderDto from "./dto/store-order.dto";
import StoreController from "./store.controller";

const router = express.Router();

/**
 * Store List[User]
 */
router.get(
  "/",
  role([ROLE.CUSTOMER]),
  asyncHandler(StoreController.getStoresList)
);

/**
 * Store List[User]
 */
router.get(
  "/items",
  role([ROLE.CUSTOMER]),
  asyncHandler(StoreController.getStoreItemsList)
);

/**
 * Store Sorting[User]
 */
router.get(
  "/sort",
  role([ROLE.CUSTOMER]),
  asyncHandler(StoreController.getStoreBySorting)
);

/**
 * global search[User]
 */
router.get(
  "/search",
  role([ROLE.CUSTOMER]),
  asyncHandler(StoreController.getStoresBySearch)
);

/**
 * Store List[User]
 */
router.get(
  "/:storeId/stores-items",
  role([ROLE.CUSTOMER]),
  asyncHandler(StoreController.getStoresItems)
);

/**
 * Popular Store Listing[User]
 */
router.get(
  "/popular",
  role([ROLE.CUSTOMER]),
  asyncHandler(StoreController.getPopularStores)
);

/**
 * Get store order details
 */
router.get(
  "/orders",
  role([ROLE.STORE]),
  validator.query(storeOrderDto),
  asyncHandler(StoreController.getStoreOrders)
);

/**
 * Update Order Status
 */
router.put(
  "/orders",
  role([ROLE.STORE]),
  validator.body(storeOrderUpdateDto),
  asyncHandler(StoreController.updateStoreOrder)
);

router.get(
  "/previous-orders",
  role([ROLE.STORE]),
  asyncHandler(StoreController.getPreviousOrders)
);

export default router;

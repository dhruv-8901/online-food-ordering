import express from "express";
import asyncHandler from "express-async-handler";
import validator from "../common/config/validator.config";

// Controllers
import favouriteController from "./favourite.controller";

// Validation
import addFavouriteStoreDto from "./dto/add-favourite-store.dto";
import addFavouriteStoreItemDto from "./dto/add-favourite-store-item.dto";
import addFavouriteSpecialItemDto from "./dto/add-favourite-special-item.dto";
import role from "../common/middleware/role";
import { ROLE } from "../common/constant";

const router = express.Router();

/**
 * Add & remove favourite store item
 */
router.post(
  "/store-item",
  role([ROLE.CUSTOMER]),
  validator.body(addFavouriteStoreItemDto),
  asyncHandler(favouriteController.addRemoveFavouriteStoreItem)
);

/**
 *  User's favourite store items list
 */
router.get(
  "/store-item",
  role([ROLE.CUSTOMER]),
  asyncHandler(favouriteController.getFavouriteStoreItem)
);

/**
 * Add & remove favourite store special item
 */
router.post(
  "/special-item",
  role([ROLE.CUSTOMER]),
  validator.body(addFavouriteSpecialItemDto),
  asyncHandler(favouriteController.addFavouriteSpecialItemDto)
);

/**
 *  User's favourite store items list
 */
router.get(
  "/special-item",
  role([ROLE.CUSTOMER]),
  asyncHandler(favouriteController.getFavouriteStoreItem)
);

/**
 * Add & remove favourite store
 */
router.post(
  "/store",
  role([ROLE.CUSTOMER]),
  validator.body(addFavouriteStoreDto),
  asyncHandler(favouriteController.addRemoveFavouriteStore)
);

/**
 *  User's favourite stores list
 */
router.get(
  "/",
  role([ROLE.CUSTOMER]),
  asyncHandler(favouriteController.getFavouriteStores)
);

export default router;

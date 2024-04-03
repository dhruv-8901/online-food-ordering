import express from "express";
import asyncHandler from "express-async-handler";
import validator from "../common/config/validator.config";

// Routes
import authRoute from "../auth/auth.route";
import userRoute from "../users/user.route";
import addressRoute from "../customer-addresses/customer-addresses.route";
import storeRoute from "../stores/store.route";
import dropdownRoute from "../dropdowns/dropdowns.route";
import storeTimingRoute from "../stores-timing/stores-timing.route";
import storeItemsRoute from "../store-items/store-items.route";
import specialItemRoutes from "../special-items/special-items.route";
import favouriteRoute from "../favourites/favourite.route";
import feedbackRoute from "../feedbacks/feedbacks.route";
import cartRoutes from "../carts/carts.route";
import orderRoutes from "../orders/orders.route";
import paymentRoutes from "../payments/payments.route";
import searchHistoryRoutes from "../search-history/search-history.route";

// Controllers
import AppVersionController from "../app-versions/app-version.controller";
import FcmTokenController from "../fcm-token/fcm-token.controller";

// Dtos
import checkVersionDto from "../app-versions/dtos/check-version.dto";
import storeFCMToken from "../fcm-token/dto/store-fcm-token.dto";
import authentication from "../common/middleware/authentication";
import { authenticate } from "passport";
import StoreController from "../stores/store.controller";
import { ROLE } from "../common/constant";
import role from "../common/middleware/role";

const router = express.Router();

//---------------------------------------------------USER ROUTES--------------------------------------------------------------------//
router.use("/users", authentication, userRoute);
router.use("/addresses", authentication, addressRoute);
router.use("/favourites", authentication, favouriteRoute);
router.use("/cart", authentication, cartRoutes);
router.use("/orders", authentication, orderRoutes);
router.use("/payments", authentication, paymentRoutes);
router.use("/search-history", authentication, searchHistoryRoutes);
router.get(
  "/dashboard",
  authentication,
  role([ROLE.CUSTOMER]),
  asyncHandler(StoreController.getStores)
);

//-------------------------------------------------------^^^^^^^^^------------------------------------------------------------------//

//------------------------------------------------STORES ROUTES----------------------------------------------------------------//
router.use("/store-timing", authentication, storeTimingRoute);
router.use("/store-items", authentication, storeItemsRoute);
// router.use("/special-items", authentication, specialItemRoutes);

//-------------------------------------------------------^^^^^^^^^------------------------------------------------------------------//

//---------------------------------------------------COMMON ROUTES------------------------------------------------------------------//
router.use("/", authRoute);
router.use("/stores", authentication, storeRoute);
router.use("/drop-down-list", authentication, dropdownRoute);
router.use("/feedback", authentication, feedbackRoute);

//-------------------------------------------------------^^^^^^^^^------------------------------------------------------------------//

router.post(
  "/fcm/token",
  authentication,
  validator.body(storeFCMToken),
  FcmTokenController.register
);
router.post("/send-push", asyncHandler(FcmTokenController.sendPush));

router.post(
  "/check-version",
  validator.body(checkVersionDto),
  asyncHandler(AppVersionController.checkVersion)
);

export default router;

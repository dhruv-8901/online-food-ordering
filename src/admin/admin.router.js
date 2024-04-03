import express from "express";
import asyncHandler from "express-async-handler";
import AuthController from "./auth/auth.controller";
import validator from "../common/config/validator.config";
import dashboardRouter from "./dashboard/dashboard.router";
import customerRouter from "./customers/customer.router";
import sendNotificationRouter from "./send-notification/send-notification.router";
import authenticateAdmin from "../common/middleware/authenticateAdmin";
import loginDto from "./auth/dto/login.dto";
import storeRoute from "./store/store.router";
import storeRequestRoute from "./store-request/store-request.router";


const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/admin/login");
});

// AUTH
router.get("/login", asyncHandler(AuthController.showLoginPage));
router.post(
  "/login",
  validator.body(loginDto),
  asyncHandler(AuthController.login)
);
router.get("/logout", authenticateAdmin, AuthController.logout);

router.use("/dashboard", authenticateAdmin, dashboardRouter);

router.use("/customers", authenticateAdmin, customerRouter);

router.use("/store", authenticateAdmin, storeRoute);

router.use("/store-request", authenticateAdmin, storeRequestRoute);

router.use("/send-notification", authenticateAdmin, sendNotificationRouter);

export default router;

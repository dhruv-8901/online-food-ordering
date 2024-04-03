import express from "express";
import SendNotificationController from "./send-notification.controller";
import asyncHandler from "express-async-handler";
import validator from "../../common/config/validator.config";
import sendNotificationDto from "./dto/send-notification.dto";

const router = express.Router();

router.get("/", asyncHandler(SendNotificationController.index));

router.post(
  "/",
  validator.body(sendNotificationDto),
  asyncHandler(SendNotificationController.send)
);

export default router;

import express from "express";
import asyncHandler from "express-async-handler";
import validator from "../common/config/validator.config";

// Controller
import FeedbacksController from "./feedbacks.controller";

// Validation
import feedbackDto from "./dto/feedback.dto";
import role from "../common/middleware/role";
import { ROLE } from "../common/constant";

const router = express.Router();

/**
 * Add User's feedback[User]
 */
router.post(
  "/",
  validator.body(feedbackDto),
  role([ROLE.CUSTOMER]),
  asyncHandler(FeedbacksController.postFeedBack)
);

/**
 * Store feedback list by id[User]
 */
router.get(
  "/:storeId",
  role([ROLE.CUSTOMER, ROLE.STORE]),
  asyncHandler(FeedbacksController.getFeedBack)
);

export default router;

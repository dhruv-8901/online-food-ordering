import express from "express";
import DashboardController from "./dashboard.controller";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get("/", asyncHandler(DashboardController.index));

export default router;

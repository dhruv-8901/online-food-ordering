import express from "express";
import CustomerController from "./customer.controller";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get("/", asyncHandler(CustomerController.index));

export default router;

import express from "express";
import asyncHandler from "express-async-handler";
import StoreController from "./store-request.controller";

const router = express.Router();

router.get("/", asyncHandler(StoreController.getStoreRequest));

export default router;

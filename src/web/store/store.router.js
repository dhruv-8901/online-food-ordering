import express from "express";
import asyncHandler from "express-async-handler";
import StoreController from "./store.controller";

const router = express.Router();

router.get("/request/:storeId", asyncHandler(StoreController.getStoreRequest));

router.get("/:id", asyncHandler(StoreController.getStoreById));

router.get("/", asyncHandler(StoreController.getStore));

export default router;

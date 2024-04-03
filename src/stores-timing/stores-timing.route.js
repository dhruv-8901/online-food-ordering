import express from "express";
import StoreTimingController from "./stores-timing.controller"
import asyncHandler from "express-async-handler";
import role from "../common/middleware/role";
import { ROLE } from "../common/constant";


const router = express.Router();

/**
 * Store timing details 
 */
router.get(
  "/",
  role([ROLE.STORE]),
  asyncHandler(StoreTimingController.getTiming)
);



/**
 * Update Store timing details
 */
router.put(
  "/",
  role([ROLE.STORE]),
  asyncHandler(StoreTimingController.updateTiming)
);
export default router;

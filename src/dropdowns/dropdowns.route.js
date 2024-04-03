import express from "express";
import asyncHandler from "express-async-handler";
import { ROLE } from "../common/constant";
import role from "../common/middleware/role";
import DropdownController from "./dropdowns.controller";

const router = express.Router();

/**
 * drop down listing
 */
router.get(
  "/",
  role([ROLE.STORE]),
  asyncHandler(DropdownController.getDropdown)
);


export default router;

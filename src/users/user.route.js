import express from "express";
import asyncHandler from "express-async-handler";

// Controller
import UserController from "./user.controller";
import userDto from "./dto/user.dto";

// middalware
import role from "../common/middleware/role"
import { ROLE } from "../common/constant";
import validator from "../common/config/validator.config";



const router = express.Router();

/**
 * User details
 */
router.get("/", role([ROLE.STORE, ROLE.CUSTOMER]), asyncHandler(UserController.getUser));

/**
 * Update user details
 */
router.put("/", role([ROLE.STORE, ROLE.CUSTOMER]), validator.body(userDto),asyncHandler(UserController.update));

/**
 * Logout
 */
router.get("/logout", role([ROLE.STORE, ROLE.CUSTOMER]), asyncHandler(UserController.logout));

export default router;

import express from "express";
import asyncHandler from "express-async-handler";
import AuthController from "./auth.controller";
import validator from "../common/config/validator.config";
import registerUserDto from "./dtos/register-user.dto";
import * as socialLoginDto from "./dtos/social-login.dto";

const router = express.Router();

router.get(
  "/phone-verification",
  asyncHandler(AuthController.phoneVerification)
);

router.post(
  "/login-with-phone",
  validator.body(registerUserDto),
  asyncHandler(AuthController.loginWithPhone)
);

router.post("/refresh-token", asyncHandler(AuthController.refreshToken));

router.post(
  "/social/login",
  validator.body(socialLoginDto.bodyWithoutToken),
  asyncHandler(AuthController.socialLoginWithoutVerification)
);

router.post(
  "/oauth/social/login",
  validator.body(socialLoginDto.body),
  asyncHandler(AuthController.socialLogin)
);

export default router;

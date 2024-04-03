import express from "express";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
import asyncHandler from "express-async-handler";
import AuthController from "./auth/auth.controller";
import validator from "../common/config/validator.config";
import dashboardRouter from "./dashboard/dashboard.router";
import customerRouter from "./customers/customer.router";
import sendNotificationRouter from "./send-notification/send-notification.router";
import authenticateAdmin from "../common/middleware/authenticateAdmin";
import loginDto from "./auth/dto/login.dto";
import storeRoute from "./store/store.router";
import storeRequestRoute from "./store-request/store-request.router";
import StoreService from "./store/store.service";
import StoreController from "./store/store.controller";
// import validator from "../common/config/validator.config";
// import userDto from "../users/dto/user.dto";

const router = express.Router();

// const firebaseConfig = {
//   apiKey: "AIzaSyCg6UC51mUPrJvop252pCcy5vIFHs6atgc",
//   authDomain: "foodorderingapp-d0523.firebaseapp.com",
//   projectId: "foodorderingapp-d0523",
//   storageBucket: "foodorderingapp-d0523.appspot.com",
//   messagingSenderId: "21611617949",
//   appId: "1:21611617949:web:5620f85aa6f9feeb27fe74",
//   measurementId: "G-XDVR7W8NX8",
// };

// const app = initializeApp(firebaseConfig);

router.get("/send-otp", (req, res) => {
  console.log(req);
  //   const phoneNumber = "+" + req.body.phoneNumber;
  //   const auth = getAuth();
  //   window.recaptchaVerifier = new RecaptchaVerifier(
  //     "recaptcha-container",
  //     {
  //       size: "normal",
  //       callback: (response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         // ...
  //       },
  //       "expired-callback": () => {
  //         // Response expired. Ask user to solve reCAPTCHA again.
  //         // ...
  //       },
  //     },
  //     auth
  //   );

  //   const appVerifier = window.recaptchaVerifier;

  //   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Error; SMS not sent
  //       // ...
  //     });
});

router.get("/registration", (req, res) => {
  res.render("web/registration");
});

router.post("/registration", asyncHandler(StoreController.registerRestaurant));

router.post("/add-store-timing", asyncHandler(StoreController.addStoreTiming));


router.get("/", (req, res) => {
  res.render("web/home");
});

export default router;

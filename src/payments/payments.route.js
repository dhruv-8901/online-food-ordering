import express from "express";
import asyncHandler from "express-async-handler";
import { ROLE } from "../common/constant";
import role from "../common/middleware/role";
import PaymentController from "./payments.controller";
import bankDetailModel from "./dto/payment.dto";
import validator from "../common/config/validator.config";

const router = express.Router();

// /**
//  * create stripe customer
//  */
// router.post(
//   "/create-customer",
//   role([ROLE.CUSTOMER]),
//   asyncHandler(PaymentController.createCustomer)
// );

router.post(
  "/add-new-card",
  role([ROLE.CUSTOMER]),
  asyncHandler(PaymentController.addNewCard)
);

router.get(
  "/customer-saved-cards",
  role([ROLE.CUSTOMER]),
  asyncHandler(PaymentController.getAllSavedCards)
);

/**
 * create stripe customer
 */
router.put(
  "/card/:cardId",
  role([ROLE.CUSTOMER]),
  asyncHandler(PaymentController.updateCardById)
);

/**
 * create stripe customer
 */
router.delete(
  "/card/:cardId",
  role([ROLE.CUSTOMER]),
  asyncHandler(PaymentController.deleteCardById)
);


/**
 * create charges 
 */
router.post(
  "/create-charges",
  role([ROLE.CUSTOMER]),
  asyncHandler(PaymentController.createCharges)
);


/**
 * create store payment receiving account in stripe  
 */
router.post(
  "/create-seller-account",
  role([ROLE.STORE]),
  validator.body(bankDetailModel),
  asyncHandler(PaymentController.createSellerAccount)
);

/**
 * Get store payment receiving bank account details
 */
router.get(
  "/store-bankaccount-info",
  role([ROLE.STORE]),
  asyncHandler(PaymentController.storePaymentBankAccountInfo)
);


/**
 * check store account verification status
 */
router.get(
  "/account-verification",
  role([ROLE.STORE]),
  asyncHandler(PaymentController.storeAccountVerificationLink)
);


/**
 * update payment charges if any error occurred 
 */
router.post(
  "/update-pending-order-payment",
  role([ROLE.CUSTOMER]),
  asyncHandler(PaymentController.updatePendingOrderPayment)
);

export default router;

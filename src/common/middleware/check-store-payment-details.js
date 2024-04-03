import BadRequestException from "../exception/bad-request.exception";
import knex from "../config/database.config";
import PaymentService from "../../payments/payments.service";
import Stripe from "stripe";
require("dotenv").config();
const StripeKey = process.env.STRIPE_KEY;
const stripe = Stripe(StripeKey);

const checkStorePaymentDetails = () => {
  return async (req, res, next) => {
    const checkStorePaymentDetails =
      await PaymentService.checkStorePaymentDetailsExist(req.user.id);
    if (!checkStorePaymentDetails) {
      return res.status(400).send({
        message:
          "You Can't Do This Operation , Add Your Payment Details First.",
      });
    } else {
      const getAccount = await stripe.accounts.retrieve(
        checkStorePaymentDetails.accountId
      );
      if (getAccount.payouts_enabled !== true) {
        return res.status(400).send({
          message:
            "You Can't Do This Operation , Add Your Required Payment Details First.",
        });
      }
      next();
    }
  };
};

export default checkStorePaymentDetails;

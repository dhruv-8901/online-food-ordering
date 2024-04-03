import BadRequestException from "../exception/bad-request.exception";
import knex from "../config/database.config";
import PaymentService from "../../payments/payments.service";

const checkCustomerPaymentDetails = () => {
  return async (req, res, next) => {
    const checkCustomerPaymentDetails =
      await PaymentService.checkCustomerPaymentAccountExist(req.user.id);
    if (!checkCustomerPaymentDetails) {
      return res.status(400).send({
        message:
          "You Can't Do This Operation , Add Your Payment Details First.",
      });
    }
    next();
  };
};

export default checkCustomerPaymentDetails;

import Joi from "joi";

const bankDetails = Joi.object({
  account_holder_name: Joi.string().optional(),
  routing_number: Joi.string().optional(),
  account_number: Joi.string().optional(),
  confirm_account_number: Joi.any()
    .valid(Joi.ref("account_number"))
    .optional()
    .messages({
      "any.only": "confirm account number does not match",
    }),
  bank_document: Joi.string().optional(),
});

export default bankDetails;

import Joi from "joi";

module.exports.body = Joi.object({
  addressLine2: Joi.string().required(),
  addressLine1: Joi.string().required(),
  addressType: Joi.string().valid("home", "office", "other").required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  isDefault: Joi.boolean().optional(),
});

module.exports.params = Joi.object({
  addressId: Joi.number().required(),
});

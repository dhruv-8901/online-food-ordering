import Joi from "joi";

const body = Joi.object({
  storeItemId: Joi.number().required(),
  valid_from: Joi.string().length(10).required(),
  valid_until: Joi.string().length(10).required(),
});

export default body;

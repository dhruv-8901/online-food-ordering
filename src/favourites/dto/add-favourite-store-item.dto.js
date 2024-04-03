import Joi from "joi";

const body = Joi.object({
  storeItemId: Joi.number().required(),
});

export default body;

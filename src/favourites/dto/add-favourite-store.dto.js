import Joi from "joi";

const body = Joi.object({
  storeId: Joi.number().required(),
});

export default body;

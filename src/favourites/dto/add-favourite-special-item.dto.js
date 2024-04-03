import Joi from "joi";

const body = Joi.object({
  specialItemId: Joi.number().required(),
});

export default body;

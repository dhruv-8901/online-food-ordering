import Joi from "joi";

const body = Joi.object({
  idToken: Joi.string().required(),
  role: Joi.number().valid(1, 2).required()
});

export default body;

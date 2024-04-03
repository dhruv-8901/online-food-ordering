import Joi from "joi";

export default Joi.object({
  days: Joi.string().valid('0', '1', '2', '3', '4', '5', '6'),
  opensAt: Joi.string(),
  closesAt: Joi.string()
});


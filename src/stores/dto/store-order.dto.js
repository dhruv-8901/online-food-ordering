import Joi from "joi";

const order = Joi.object({
  status: Joi.number().valid(0, 2).required(),
  perPage: Joi.number().optional(),
  currentPage: Joi.number().optional()
});

export default order;

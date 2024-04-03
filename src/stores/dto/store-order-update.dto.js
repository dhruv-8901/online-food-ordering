import Joi from "joi";

const orderUpdate = Joi.object({
  orderId: Joi.number().required(),
  status: Joi.number().valid(0, 1, -1, 2, 3, 4, 5).required(),
});

export default orderUpdate;

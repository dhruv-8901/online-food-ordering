import Joi from "joi";

export default Joi.object({
  orderId: Joi.number().required(),
});

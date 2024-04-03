import Joi from "joi";

export default Joi.object({
  storeItemId: Joi.number().required(),
  quantity: Joi.number().required()
});

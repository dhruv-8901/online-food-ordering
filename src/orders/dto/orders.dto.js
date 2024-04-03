import Joi from "joi";

export default Joi.object({
  addressId: Joi.number().required(),
  cardId: Joi.string().required(),
  orderingInstruction: Joi.string().optional().allow(null),
});

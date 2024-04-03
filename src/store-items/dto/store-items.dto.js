import Joi from "joi";

export default Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  cuisineIds: Joi.string(),
  categoryId: Joi.string().valid("1", "2", "3").required(),
  image: Joi.string().optional().allow(null),
  isSpecial: Joi.boolean().default(false),
  valid_from: Joi.alternatives().conditional("isSpecial", {
    is: true,
    then: Joi.string().length(10).required(),
    otherwise: Joi.string().optional().allow(null),
  }),
  valid_until: Joi.alternatives().conditional("isSpecial", {
    is: true,
    then: Joi.string().length(10).required(),
    otherwise: Joi.string().optional().allow(null),
  }),
});

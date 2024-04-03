import Joi from "joi";

export default Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  cuisineIds: Joi.string(),
  categoryId: Joi.string().valid("1", "2", "3").required(),
  image: Joi.string().optional().allow(null),
  valid_from: Joi.string(),
  valid_until: Joi.string(),
});

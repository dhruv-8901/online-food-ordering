import Joi from "joi";

const feedback = Joi.object({
  storeId: Joi.number().required(),
  rating: Joi.number().min(0).max(5),
  review: Joi.string().optional()
});

export default feedback;

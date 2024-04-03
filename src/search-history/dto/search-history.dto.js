import Joi from "joi";

const searchHistory = Joi.object({
  storeId: Joi.alternatives().conditional("type", {
    is: 1,
    then: Joi.number().required(),
    otherwise: Joi.string().optional().allow(null),
  }),
  storeItemId: Joi.alternatives().conditional("type", {
    is: 2,
    then: Joi.number().required(),
    otherwise: Joi.string().optional().allow(null),
  }),
  type: Joi.number().valid(1, 2).required(),
});

export default searchHistory;

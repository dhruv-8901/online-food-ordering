import Joi from "joi";

export default Joi.object({
  storeItemId: Joi.string().optional().allow(null),
  // isSpecial: Joi.boolean().optional().default(false)
});


import Joi from "joi";

export default Joi.object({
  type: Joi.string().valid("iOS", "Android"),
  appVersion: Joi.string().required(),
});

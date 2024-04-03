import Joi from "joi";

export default Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is not allowed to be empty.",
  }),
  message: Joi.string().required().messages({
    "string.empty": "Message is not allowed to be empty.",
  }),
});

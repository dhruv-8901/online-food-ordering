import Joi from "joi";

export default Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Please enter Email ID.",
    "string.email": "Email ID must be a valid email.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Please enter Password.",
  }),
});

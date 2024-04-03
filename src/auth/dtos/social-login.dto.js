import Joi from "joi";
import { PROVIDER } from "../../common/config/constants.config";

export const bodyWithoutToken = Joi.object().keys({
  firstName: Joi.string().min(2).max(25).required(),
  lastName: Joi.string().min(2).max(25).required(),
  email: Joi.string(),
  providerType: Joi.string()
    .valid(PROVIDER.FACEBOOK, PROVIDER.GOOGLE, PROVIDER.APPLE)
    .required(),
  providerKey: Joi.string().required(),
});

export const body = Joi.object().keys({
  providerType: Joi.string()
    .valid(PROVIDER.FACEBOOK, PROVIDER.GOOGLE, PROVIDER.APPLE)
    .required(),
  token: Joi.string().required(),
});

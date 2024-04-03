import Joi from "joi";

const body = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  storeName: Joi.string().optional(),
  email: Joi.string().email().optional().allow(null),
  idToken: Joi.string().optional().allow(null),
  image: Joi.string().optional().allow(null),
  storeCountryCode: Joi.string().optional().allow(null),
  storeContactNumber: Joi.string().optional().allow(null),
  isDetailsSkip: Joi.boolean().optional(),
  isAddressSkip: Joi.boolean().optional(),
  addressLine1: Joi.string().optional(),
  addressLine2: Joi.string().optional(),
  latitude: Joi.string().optional(),
  longitude: Joi.string().optional(),
});

export default body;

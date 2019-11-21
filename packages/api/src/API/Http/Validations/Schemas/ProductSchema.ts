import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeProductSchema = {
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

export const updateProductSchema = {
  name: Joi.string()
    .min(3)
    .max(100)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeElementSchema = {
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  code: Joi.string()
    .min(2)
    .max(5)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  service: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  description: Joi.string()
    .min(0)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

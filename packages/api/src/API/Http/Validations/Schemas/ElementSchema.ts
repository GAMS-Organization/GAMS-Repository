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
    .min(1)
    .max(8)
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
    .allow(null)
    .min(0)
    .max(100)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

export const updateElementSchema = {
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  description: Joi.string()
    .allow(null)
    .min(0)
    .max(100)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  steps: Joi.string()
    .allow(null)
    .min(0)
    .max(1000)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

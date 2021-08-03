import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeAssetSchema = {
  sector: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  area: Joi.string()
    .min(3)
    .max(100)
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
  element: Joi.string()
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

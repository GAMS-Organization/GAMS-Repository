import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeAreaSchema = {
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
  sector: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  services: Joi.array()
    .items(Joi.string())
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeServiceSchema = {
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
};

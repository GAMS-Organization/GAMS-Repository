import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeEntrySchema = {
  observations: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  date: Joi.string()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  products: Joi.array()
    .items(Joi.number())
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  quantities: Joi.array()
    .items(Joi.number().positive())
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  providers: Joi.array()
    .items(Joi.string())
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

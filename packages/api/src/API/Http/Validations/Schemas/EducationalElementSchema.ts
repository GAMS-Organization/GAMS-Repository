import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeEducationalElementSchema = {
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  totalQuantity: Joi.number()
    .min(1)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  borrowQuantity: Joi.number()
    .min(0)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

export const updateEducationalElementSchema = {
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  totalQuantity: Joi.number()
    .min(1)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  borrowQuantity: Joi.number()
    .min(0)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

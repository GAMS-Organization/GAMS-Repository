import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeWorkOrderSchema = {
  orderDate: Joi.string()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  priority: Joi.string()
    .min(3)
    .max(12)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  comment: Joi.string()
    .max(80)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  assetId: Joi.number()
    .required()
    .positive()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  authorId: Joi.number()
    .required()
    .positive()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

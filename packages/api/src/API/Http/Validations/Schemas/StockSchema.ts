import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeStockSchema = {
  product: Joi.object()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  quantity: Joi.number()
    .required()
    .positive()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  minimunQuantity: Joi.number()
    .required()
    .positive()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

export const updateStockSchema = {
  quantity: Joi.number()
    .required()
    .positive()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  minimunQuantity: Joi.number()
    .required()
    .positive()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

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
    .max(200)
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

export const updateWorkOrderSchema = {
  orderDate: Joi.string()
    .required()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  startDate: Joi.string()
    .required()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  realizationDate: Joi.string()
    .required()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  priority: Joi.string()
    .min(3)
    .max(12)
    .required()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  comment: Joi.string()
    .max(200)
    .required()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  taskDescription: Joi.string()
    .max(250)
    .required()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  state: Joi.string()
    .min(3)
    .max(12)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  assetId: Joi.number()
    .required()
    .positive()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  userId: Joi.number()
    .required()
    .positive()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  workersId: Joi.array()
    .items(Joi.number())
    .required()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

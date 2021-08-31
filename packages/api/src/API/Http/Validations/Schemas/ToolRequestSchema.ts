import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeToolRequestSchema = {
  toolId: Joi.number()
    .min(1)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  authorId: Joi.number()
    .min(1)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  date: Joi.string()
    .required()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  areaId: Joi.number()
    .min(1)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  quantity: Joi.number()
    .min(1)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

export const updateToolRequestSchema = {
  toolId: Joi.number()
    .min(1)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  status: Joi.string()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  areaId: Joi.number()
    .min(1)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

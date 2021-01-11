import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeEventSchema = {
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  description: Joi.string()
    .required()
    .max(250)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  startDate: Joi.string()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  endDate: Joi.string()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  allDay: Joi.boolean()
    .allow(null)
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

export const updateEventSchema = {
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  description: Joi.string()
    .required()
    .max(250)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  startDate: Joi.string()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  endDate: Joi.string()
    .allow(null)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  allDay: Joi.boolean()
    .allow(null)
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

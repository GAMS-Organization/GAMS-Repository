import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeEducationSchema = {
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  grade: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  institution: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  startDate: Joi.date()
    .iso()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  endDate: Joi.date()
    .iso()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  rooftopperProfileId: Joi.number()
    .integer()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

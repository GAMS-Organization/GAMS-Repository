import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeRooftopperSchema = {
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  surname: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  profileImage: Joi.string() // TODO: Can be url (file service)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  registrationDate: Joi.date()
    .iso()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  isAvailable: Joi.boolean()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  isWorkingOnAnotherProject: Joi.boolean()
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  workableTime: Joi.number()
    .integer()
    .min(4)
    .max(8)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  slug: Joi.string()
    .regex(/^[a-z0-9-]+$/, 'must be a valid slug')
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  oneLineDescription: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  summaryDescription: Joi.string()
    .min(3)
    .max(255)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  city: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  state: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  country: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

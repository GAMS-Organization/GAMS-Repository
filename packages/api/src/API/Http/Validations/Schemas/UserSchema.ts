import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';
import { UserStates } from '../../../../Domain/Enums/UserStates';

export const storeUserSchema = {
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
  email: Joi.string()
    .required()
    .email()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  username: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  password: Joi.string()
    .min(3)
    .max(20)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  passwordConfirmation: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .options({ language: { any: { allowOnly: 'must match password' } } }),
  roles: Joi.array()
    .items(Joi.string())
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

export const updateUserSchema = {
  name: Joi.string()
    .min(3)
    .max(100)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  surname: Joi.string()
    .min(3)
    .max(100)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  email: Joi.string()
    .email()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  roles: Joi.array()
    .items(Joi.string())
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  username: Joi.string()
    .min(3)
    .max(100)
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
  userState: Joi.string()
    .min(3)
    .max(100)
    .valid(Object.keys(UserStates).map(key => UserStates[key]))
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

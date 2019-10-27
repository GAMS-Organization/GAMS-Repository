import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const LoginSchema = {
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
};

export const SignInSchema = {
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
};

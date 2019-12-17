import * as Joi from 'joi';
import * as customErrorMessages from '../Utils/BaseErrorSchema';

export const storeSectorSchema = {
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(errors => {
      return customErrorMessages.default(errors);
    }),
};

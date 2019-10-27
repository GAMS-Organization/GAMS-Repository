import { NextFunction, Request, Response } from 'express';
import { error } from './customResponse';
import EntityNotFoundException from '../Application/Exceptions/EntityNotFoundException';
import NotFoundException from '../API/Http/Exceptions/NotFoundException';
import { HTTP_CODES } from '../API/Http/Enums/HttpStatuses';
import { codeErrors } from '../API/Http/Validations/Utils/ErrorMessages';
import InternalErrorException from '../API/Http/Exceptions/InternalErrorException';
import ValidationException from '../Application/Exceptions/ValidationException';
import BadRequestException from '../API/Http/Exceptions/BadRequestException';
import UnprocessableEntityException from '../API/Http/Exceptions/UnprocessableEntityException';
import AuthorizationFailed from '../Application/Exceptions/AuthorizationFailed';
import AuthorizationException from '../API/Http/Exceptions/AuthorizationException';
import AuthenticationFailed from '../Application/Exceptions/AuthenticationFailed';
import AuthenticationException from '../API/Http/Exceptions/AuthenticationException';
import DIContainer from '../Infrastructure/DI/di.config';
import { ILoggerService } from '../Domain/Services/Logger/ILoggerService';
import { INTERFACES } from '../Infrastructure/DI/interfaces.types';
import { LogLevels } from '../Domain/Services/Logger/LogLevels';

export const logErrors = (e: any, _request: Request, _response: Response, next: NextFunction) => {
  const logger = DIContainer.get<ILoggerService>(INTERFACES.ILoggerService);
  logger.log(LogLevels.ERROR, e);
  return next(e);
};

export const mapApplicationToHTTPErrors = async (
  e: any,
  _request: Request,
  _response: Response,
  next: NextFunction,
) => {
  switch (e.constructor) {
    case EntityNotFoundException:
      e = new NotFoundException(
        e.message,
        HTTP_CODES.NOT_FOUND,
        codeErrors.HTTP.NOT_FOUND.code,
        codeErrors.HTTP.NOT_FOUND.href,
      );
      return next(e);
    case ValidationException:
      if (JSON.parse(e.message).type === 'BadRequestException') {
        e = new BadRequestException(
          e.message,
          HTTP_CODES.BAD_REQUEST,
          codeErrors.HTTP.BAD_REQUEST.code,
          codeErrors.HTTP.BAD_REQUEST.href,
        );
        return next(e);
      }
      e = new UnprocessableEntityException(
        e.message,
        HTTP_CODES.UNPROCESSABLE_ENTITY,
        codeErrors.HTTP.UNPROCESSABLE_ENTITY.code,
        codeErrors.HTTP.UNPROCESSABLE_ENTITY.href,
      );
      return next(e);
    case AuthorizationFailed:
      e = new AuthorizationException(
        e.message,
        HTTP_CODES.UNAUTHORIZED,
        codeErrors.HTTP.UNAUTHORIZED.code,
        codeErrors.HTTP.UNAUTHORIZED.href,
      );
      return next(e);
    case AuthenticationFailed:
      e = new AuthenticationException(
        e.message,
        HTTP_CODES.FORBIDDEN,
        codeErrors.HTTP.FORBIDDEN.code,
        codeErrors.HTTP.FORBIDDEN.href,
      );
      return next(e);
    default:
      e = new InternalErrorException(
        e.message,
        HTTP_CODES.INTERNAL_ERROR,
        codeErrors.HTTP.INTERNAL_ERROR.code,
        codeErrors.HTTP.INTERNAL_ERROR.href,
      );
      return next(e);
  }
};

export const execute = async (e: any, _request: Request, response: Response, _next: NextFunction) => {
  if (e instanceof BadRequestException || e instanceof UnprocessableEntityException) {
    return response.status(e.status).json(error(e.name, JSON.parse(e.message), e.type, e.href));
  }

  return response.status(e.status).json(error(e.name, e.message, e.type, e.href));
};

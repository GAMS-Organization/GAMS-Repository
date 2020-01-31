import { Request, Response, NextFunction } from 'express';
import jwtConfig from './jwtConfig';
import * as jwt from 'jsonwebtoken';
import AuthenticationFailed from '../Application/Exceptions/AuthenticationFailed';
import AuthorizationFailed from '../Application/Exceptions/AuthorizationFailed';

const checkRolesMiddleware = (roles: string[], decoded): void => {
  if (typeof decoded == 'object' && decoded.roles) {
    let isIncluded = false;
    roles.forEach((role: string): void => {
      if (decoded.roles.includes(role)) {
        isIncluded = true;
      }
    });
    if (!isIncluded) {
      throw new AuthenticationFailed('Unauthorized - invalid role');
    }
  } else {
    throw new AuthorizationFailed('Unauthorized or corrupted token');
  }
};

export const authMiddleware = (request: Request, _response: Response, next: NextFunction, roles?: string[]): void => {
  const token: string = request.body.authorization || request.query.authorization || request.headers['authorization'];
  if (token) {
    jwt.verify(token, jwtConfig.jwtSecret, (err, decoded): void => {
      if (err) {
        throw new AuthorizationFailed('Unauthorized or corrupted token');
      }
      if (roles) {
        checkRolesMiddleware(roles, decoded);
      }
      return next();
    });
  } else {
    throw new AuthorizationFailed('No token retrieved');
  }
};

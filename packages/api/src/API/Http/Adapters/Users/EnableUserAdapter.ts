import EnableUserCommand from '../../../../Application/Commands/Users/EnableUserCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class EnableUserAdapter {
  public from(request: Request): EnableUserCommand {
    const userId = parseInt(request.params.id);

    if (!userId) {
      throw new ValidationException('El id del usuario es requerido');
    }

    if (userId < 1) {
      throw new ValidationException('El id del usuario no es válido');
    }

    return new EnableUserCommand(userId);
  }
}

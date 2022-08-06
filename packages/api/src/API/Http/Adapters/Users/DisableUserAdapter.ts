import DisableUserCommand from '../../../../Application/Commands/Users/DisableUserCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class DisableUserAdapter {
  public from(request: Request): DisableUserCommand {
    const userId = parseInt(request.params.id);

    if (!userId) {
      throw new ValidationException('El id del usuario es requerido');
    }

    if (userId < 1) {
      throw new ValidationException('El id del usuario no es válido');
    }

    return new DisableUserCommand(userId);
  }
}

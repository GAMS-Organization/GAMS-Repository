import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyUserCommand from '../../../../Application/Commands/Users/DestroyUserCommand';

@injectable()
export default class DestroyUserAdapter {
  public from(request: Request): DestroyUserCommand {
    const userId = parseInt(request.params.id);

    if (!userId) {
      throw new ValidationException('El id del usuario es requerido');
    }

    if (userId < 1) {
      throw new ValidationException('El id del usuario no es válido');
    }

    return new DestroyUserCommand(userId);
  }
}

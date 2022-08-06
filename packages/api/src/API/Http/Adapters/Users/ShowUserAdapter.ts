import ShowUsersCommand from '../../../../Application/Commands/Users/ShowUsersCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowUserAdapter {
  public from(request: Request): ShowUsersCommand {
    const userId = parseInt(request.params.id);

    if (!userId) {
      throw new ValidationException('El id del usuario es requerido');
    }

    if (userId < 1) {
      throw new ValidationException('El id del usuario no es válido');
    }

    return new ShowUsersCommand(userId);
  }
}

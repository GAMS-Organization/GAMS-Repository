import DisableUserCommand from '../../../../Application/Commands/Users/DisableUserCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class DisableUserAdapter {
  public from(request: Request): DisableUserCommand {
    const userId = parseInt(request.params.id);

    if (!userId) {
      throw new ValidationException('User id are required');
    }

    if (userId < 1) {
      throw new ValidationException('User id is not valid');
    }

    return new DisableUserCommand(userId);
  }
}

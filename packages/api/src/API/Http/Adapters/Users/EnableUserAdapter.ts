import EnableUserCommand from '../../../../Application/Commands/Users/EnableUserCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class EnableUserAdapter {
  public from(request: Request): EnableUserCommand {
    const userId = request.params.id;

    if (!userId) {
      throw new ValidationException('User id are required');
    }

    if (userId < 1) {
      throw new ValidationException('User id is not valid');
    }

    return new EnableUserCommand(userId);
  }
}

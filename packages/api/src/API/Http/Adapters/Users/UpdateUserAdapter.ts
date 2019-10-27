import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateUserCommand from '../../../../Application/Commands/Users/UpdateUserCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateUserSchema } from '../../Validations/Schemas/UserSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateUserAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateUserCommand {
    const error = this.validator.validate(request.body, updateUserSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateUserCommand(
      request.params.id,
      request.body.name,
      request.body.surname,
      request.body.email,
      request.body.roles,
      request.body.userState,
      request.body.username,
    );
  }
}

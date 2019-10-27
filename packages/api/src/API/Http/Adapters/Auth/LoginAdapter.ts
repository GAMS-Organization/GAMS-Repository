import { Request } from 'express';
import { injectable } from 'inversify';
import LoginCommand from '../../../../Application/Commands/Auth/LoginCommand';
import Validator from '../../Validations/Utils/Validator';
import { LoginSchema } from '../../Validations/Schemas/AuthSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class LoginAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): LoginCommand {
    const error = this.validator.validate(request.body, LoginSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new LoginCommand(request.body.username, request.body.password);
  }
}

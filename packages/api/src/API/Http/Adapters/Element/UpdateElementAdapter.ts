import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateElementCommand from '../../../../Application/Commands/Element/UpdateElementCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateElementSchema } from '../../Validations/Schemas/ElementSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateElementAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateElementCommand {
    const error = this.validator.validate(request.body, updateElementSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateElementCommand(
      parseInt(request.params.id),
      request.body.name,
      request.body.description,
      request.body.steps,
    );
  }
}

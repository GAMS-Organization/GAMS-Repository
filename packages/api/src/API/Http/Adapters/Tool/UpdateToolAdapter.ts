import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateToolCommand from '../../../../Application/Commands/Tool/UpdateToolCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateToolSchema } from '../../Validations/Schemas/ToolSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateToolAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateToolCommand {
    const error = this.validator.validate(request.body, updateToolSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateToolCommand(
      parseInt(request.params.id),
      request.body.name,
      request.body.totalQuantity,
      request.body.borrowQuantity,
    );
  }
}

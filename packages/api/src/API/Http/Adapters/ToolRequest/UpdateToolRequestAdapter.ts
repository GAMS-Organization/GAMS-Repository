import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateElementRequestCommand from '../../../../Application/Commands/ElementRequest/UpdateElementRequestCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateElementRequestSchema } from '../../Validations/Schemas/ElementRequestSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateElementRequestAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateElementRequestCommand {
    const error = this.validator.validate(request.body, updateElementRequestSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateElementRequestCommand(
      parseInt(request.params.id),
      request.body.educationalElementId,
      request.body.status,
      request.body.areaId,
    );
  }
}

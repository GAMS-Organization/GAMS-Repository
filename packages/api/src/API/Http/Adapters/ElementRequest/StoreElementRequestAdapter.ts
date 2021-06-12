import { Request } from 'express';
import { injectable } from 'inversify';
import StoreElementRequestCommand from '../../../../Application/Commands/ElementRequest/StoreElementRequestCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeElementRequestSchema } from '../../Validations/Schemas/ElementRequestSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreElementRequestAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreElementRequestCommand {
    const error = this.validator.validate(request.body, storeElementRequestSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreElementRequestCommand(request.body.educationalElementId, request.body.authorId, request.body.date);
  }
}

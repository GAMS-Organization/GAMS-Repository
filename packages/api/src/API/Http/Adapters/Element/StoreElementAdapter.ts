import { Request } from 'express';
import { injectable } from 'inversify';
import StoreElementCommand from '../../../../Application/Commands/Element/StoreElementCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeElementSchema } from '../../Validations/Schemas/ElementSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreElementAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreElementCommand {
    const error = this.validator.validate(request.body, storeElementSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreElementCommand(
      request.body.name,
      request.body.code,
      request.body.service,
      request.body.steps ? request.body.steps : '',
    );
  }
}

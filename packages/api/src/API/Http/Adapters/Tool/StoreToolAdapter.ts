import { Request } from 'express';
import { injectable } from 'inversify';
import StoreToolCommand from '../../../../Application/Commands/Tool/StoreToolCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeToolSchema } from '../../Validations/Schemas/ToolSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreToolAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreToolCommand {
    const error = this.validator.validate(request.body, storeToolSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreToolCommand(request.body.name, request.body.totalQuantity, request.body.borrowQuantity);
  }
}

import { Request } from 'express';
import { injectable } from 'inversify';
import StoreProductCommand from '../../../../Application/Commands/Product/StoreProductCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeProductSchema } from '../../Validations/Schemas/ProductSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreUserAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreProductCommand {
    const error = this.validator.validate(request.body, storeProductSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreProductCommand(request.body.name);
  }
}

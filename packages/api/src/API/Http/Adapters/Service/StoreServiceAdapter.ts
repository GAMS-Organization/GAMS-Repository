import { Request } from 'express';
import { injectable } from 'inversify';
import StoreServiceCommand from '../../../../Application/Commands/Service/StoreServiceCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeServiceSchema } from '../../Validations/Schemas/ServiceSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreServiceAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreServiceCommand {
    const error = this.validator.validate(request.body, storeServiceSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreServiceCommand(request.body.name, request.body.code);
  }
}

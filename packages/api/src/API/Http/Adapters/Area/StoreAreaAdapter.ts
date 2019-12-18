import { Request } from 'express';
import { injectable } from 'inversify';
import StoreAreaCommand from '../../../../Application/Commands/Area/StoreAreaCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeAreaSchema } from '../../Validations/Schemas/AreaSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreAreaAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreAreaCommand {
    const error = this.validator.validate(request.body, storeAreaSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreAreaCommand(request.body.name, request.body.sector);
  }
}

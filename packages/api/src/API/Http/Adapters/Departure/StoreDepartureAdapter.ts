import { Request } from 'express';
import { injectable } from 'inversify';
import StoreDepartureCommand from '../../../../Application/Commands/Departure/StoreDepartureCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeDepartureSchema } from '../../Validations/Schemas/DepartureSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreDepartureAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreDepartureCommand {
    const error = this.validator.validate(request.body, storeDepartureSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreDepartureCommand(
      request.body.date,
      request.body.observations,
      request.body.products,
      request.body.quantities,
      request.body.providers,
    );
  }
}

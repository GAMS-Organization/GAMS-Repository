import { Request } from 'express';
import { injectable } from 'inversify';
import StoreEntryCommand from '../../../../Application/Commands/Entry/StoreEntryCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeEntrySchema } from '../../Validations/Schemas/EntrySchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreEntryAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreEntryCommand {
    const error = this.validator.validate(request.body, storeEntrySchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreEntryCommand(
      request.body.date,
      request.body.observations,
      request.body.products,
      request.body.quantities,
      request.body.providers,
    );
  }
}

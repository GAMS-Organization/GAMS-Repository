import { Request } from 'express';
import { injectable } from 'inversify';
import StoreEducationalElementCommand from '../../../../Application/Commands/EducationalElement/StoreEducationalElementCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeEducationalElementSchema } from '../../Validations/Schemas/EducationalElementSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreEducationalElementAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreEducationalElementCommand {
    const error = this.validator.validate(request.body, storeEducationalElementSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreEducationalElementCommand(
      request.body.name,
      request.body.totalQuantity,
      request.body.borrowQuantity,
    );
  }
}

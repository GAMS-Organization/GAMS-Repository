import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateEducationalElementCommand from '../../../../Application/Commands/EducationalElement/UpdateEducationalElementCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateEducationalElementSchema } from '../../Validations/Schemas/EducationalElementSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateEducationalElementAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateEducationalElementCommand {
    const error = this.validator.validate(request.body, updateEducationalElementSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateEducationalElementCommand(
      parseInt(request.params.id),
      request.body.name,
      request.body.totalQuantity,
      request.body.borrowQuantity,
    );
  }
}

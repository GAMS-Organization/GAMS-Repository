import { Request } from 'express';
import { injectable } from 'inversify';
import StoreEducationCommand from '../../../../Application/Commands/Educations/StoreEducationCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeEducationSchema } from '../../Validations/Schemas/EducationSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreEducationAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public async from(request: Request): Promise<StoreEducationCommand> {
    const error = this.validator.validate(request.body, storeEducationSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreEducationCommand(
      request.body.title,
      request.body.grade,
      request.body.institution,
      new Date(request.body.startDate),
      request.body.rooftopperProfileId,
      request.body.endDate ? new Date(request.body.endDate) : null,
    );
  }
}

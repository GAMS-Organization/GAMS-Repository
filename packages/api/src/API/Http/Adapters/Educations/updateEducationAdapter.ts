import { Request } from 'express';
import { injectable } from 'inversify';
import Validator from '../../Validations/Utils/Validator';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import UpdateEducationsCommand from '../../../../Application/Commands/Educations/UpdateEducationsCommand';
import { storeEducationSchema } from '../../Validations/Schemas/EducationSchema';

@injectable()
export default class UpdateEducationAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public async from(request: Request): Promise<UpdateEducationsCommand> {
    const error = this.validator.validate(request.body, storeEducationSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateEducationsCommand(
      request.params.id,
      request.body.title,
      request.body.grade,
      request.body.institution,
      new Date(request.body.startDate),
      request.body.rooftopperProfileId,
      request.body.endDate ? new Date(request.body.endDate) : null,
    );
  }
}

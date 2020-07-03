import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateAreaCommand from '../../../../Application/Commands/Area/UpdateAreaCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateAreaSchema } from '../../Validations/Schemas/AreaSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateAreaAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateAreaCommand {
    const error = this.validator.validate(request.body, updateAreaSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }
    return new UpdateAreaCommand(
      parseInt(request.params.id),
      request.body.name,
      request.body.services,
      request.body.maps ? request.body.maps : [],
    );
  }
}

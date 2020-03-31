import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateSectorCommand from '../../../../Application/Commands/Sector/UpdateSectorCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateSectorSchema } from '../../Validations/Schemas/SectorSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateSectorAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateSectorCommand {
    const error = this.validator.validate(request.body, updateSectorSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateSectorCommand(parseInt(request.params.id), request.body.map);
  }
}

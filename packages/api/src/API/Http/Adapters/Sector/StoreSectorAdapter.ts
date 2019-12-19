import { Request } from 'express';
import { injectable } from 'inversify';
import StoreSectorCommand from '../../../../Application/Commands/Sector/StoreSectorCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeSectorSchema } from '../../Validations/Schemas/SectorSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreSectorAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreSectorCommand {
    const error = this.validator.validate(request.body, storeSectorSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreSectorCommand(request.body.name, request.body.code);
  }
}

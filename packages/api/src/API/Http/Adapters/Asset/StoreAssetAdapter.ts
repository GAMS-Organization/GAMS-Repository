import { Request } from 'express';
import { injectable } from 'inversify';
import StoreAssetCommand from '../../../../Application/Commands/Asset/StoreAssetCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeAssetSchema } from '../../Validations/Schemas/AssetSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreAreaAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreAssetCommand {
    const error = this.validator.validate(request.body, storeAssetSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreAssetCommand(
      request.body.sector,
      request.body.description,
      request.body.area,
      request.body.service,
      request.body.element,
    );
  }
}

import { Request } from 'express';
import { injectable } from 'inversify';
import StoreStockCommand from '../../../../Application/Commands/Stock/StoreStockCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeStockSchema } from '../../Validations/Schemas/StockSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreUserAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreStockCommand {
    const error = this.validator.validate(request.body, storeStockSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreStockCommand(request.body.product, request.body.quantity, request.body.minimunQuantity);
  }
}

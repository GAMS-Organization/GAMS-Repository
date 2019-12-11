import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateStockCommand from '../../../../Application/Commands/Stock/UpdateStockCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateStockSchema } from '../../Validations/Schemas/StockSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateStockAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateStockCommand {
    const error = this.validator.validate(request.body, updateStockSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateStockCommand(
      parseInt(request.params.id),
      request.body.quantity,
      request.body.minimunQuantity,
    );
  }
}

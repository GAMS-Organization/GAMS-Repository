import { Request } from 'express';
import { injectable } from 'inversify';
import StoreWorkOrderCommand from '../../../../Application/Commands/WorkOrder/StoreWorkOrderCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeWorkOrderSchema } from '../../Validations/Schemas/WorkOrderSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreWorkOrderAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreWorkOrderCommand {
    const error = this.validator.validate(request.body, storeWorkOrderSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreWorkOrderCommand(
      request.body.orderDate,
      request.body.priority,
      request.body.comment,
      request.body.assetId,
      request.body.authorId,
    );
  }
}

import { Request } from 'express';
import { injectable } from 'inversify';
import TakeWorkOrderCommand from '../../../../Application/Commands/WorkOrder/TakeWorkOrderCommand';
import Validator from '../../Validations/Utils/Validator';
import { takeWorkOrderSchema } from '../../Validations/Schemas/WorkOrderSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class TakeWorkOrderAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): TakeWorkOrderCommand {
    const error = this.validator.validate(request.body, takeWorkOrderSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new TakeWorkOrderCommand(
      parseInt(request.params.id),
      request.body.startDate,
      request.body.state,
      request.body.authorId,
    );
  }
}

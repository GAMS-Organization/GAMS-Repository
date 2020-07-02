import { Request } from 'express';
import { injectable } from 'inversify';
import CancelWorkOrderCommand from '../../../../Application/Commands/WorkOrder/CancelWorkOrderCommand';
import Validator from '../../Validations/Utils/Validator';
import { cancelWorkOrderSchema } from '../../Validations/Schemas/WorkOrderSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class CancelWorkOrderAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): CancelWorkOrderCommand {
    const error = this.validator.validate(request.body, cancelWorkOrderSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new CancelWorkOrderCommand(parseInt(request.params.id), request.body.taskDescription, request.body.authorId);
  }
}

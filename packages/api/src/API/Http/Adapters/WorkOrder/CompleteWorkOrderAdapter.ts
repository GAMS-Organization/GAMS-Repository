import { Request } from 'express';
import { injectable } from 'inversify';
import CompleteWorkOrderCommand from '../../../../Application/Commands/WorkOrder/CompleteWorkOrderCommand';
import Validator from '../../Validations/Utils/Validator';
import { completeWorkOrderSchema } from '../../Validations/Schemas/WorkOrderSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class CompleteWorkOrderAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): CompleteWorkOrderCommand {
    const error = this.validator.validate(request.body, completeWorkOrderSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new CompleteWorkOrderCommand(parseInt(request.params.id), request.body.realizationDate, request.body.taskDescription, request.body.productsId , request.body.quantities);
  }
}

import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateWorkOrderCommand from '../../../../Application/Commands/WorkOrder/UpdateWorkOrderCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateWorkOrderSchema } from '../../Validations/Schemas/WorkOrderSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateWorkOrderAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateWorkOrderCommand {
    const error = this.validator.validate(request.body, updateWorkOrderSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateWorkOrderCommand(
      parseInt(request.params.id),
      request.body.orderDate,
      request.body.startDate,
      request.body.realizationDate,
      request.body.priority,
      request.body.state,
      request.body.comment,
      request.body.taskDescription,
      request.body.assetId,
      request.body.userId,
      request.body.workersId,
    );
  }
}

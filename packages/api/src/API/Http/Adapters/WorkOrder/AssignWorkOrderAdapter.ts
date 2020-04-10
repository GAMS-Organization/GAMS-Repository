import { Request } from 'express';
import { injectable } from 'inversify';
import AssignWorkOrderCommand from '../../../../Application/Commands/WorkOrder/AssignWorkOrderCommand';
import Validator from '../../Validations/Utils/Validator';
import { assignWorkOrderSchema } from '../../Validations/Schemas/WorkOrderSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class AssignWorkOrderAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): AssignWorkOrderCommand {
    const error = this.validator.validate(request.body, assignWorkOrderSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new AssignWorkOrderCommand(parseInt(request.params.id), request.body.startDate, request.body.workersId);
  }
}

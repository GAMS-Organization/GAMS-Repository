import ShowWorkOrderCommand from '../../../../Application/Commands/WorkOrder/ShowWorkOrderCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowWorkOrderAdapter {
  public from(request: Request): ShowWorkOrderCommand {
    const workOrderId = parseInt(request.params.id);

    if (!workOrderId) {
      throw new ValidationException('Work order id are required');
    }

    if (workOrderId < 1) {
      throw new ValidationException('Work order id is not valid');
    }

    return new ShowWorkOrderCommand(workOrderId);
  }
}

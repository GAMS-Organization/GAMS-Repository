import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyServiceCommand from '../../../../Application/Commands/Service/DestroyServiceCommand';

@injectable()
export default class DestroyServiceAdapter {
  public from(request: Request): DestroyServiceCommand {
    const serviceId = parseInt(request.params.id);

    if (!serviceId) {
      throw new ValidationException('Service id are required');
    }

    if (serviceId < 1) {
      throw new ValidationException('Service id is not valid');
    }

    return new DestroyServiceCommand(serviceId);
  }
}

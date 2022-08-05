import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyServiceCommand from '../../../../Application/Commands/Service/DestroyServiceCommand';

@injectable()
export default class DestroyServiceAdapter {
  public from(request: Request): DestroyServiceCommand {
    const serviceId = parseInt(request.params.id);

    if (!serviceId) {
      throw new ValidationException('El id del servicio es requerido');
    }

    if (serviceId < 1) {
      throw new ValidationException('El id del servicio no es válido');
    }

    return new DestroyServiceCommand(serviceId);
  }
}

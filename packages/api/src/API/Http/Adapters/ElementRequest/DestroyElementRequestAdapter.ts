import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyElementRequestCommand from '../../../../Application/Commands/ElementRequest/DestroyElementRequestCommand';

@injectable()
export default class DestroyElementRequestAdapter {
  public from(request: Request): DestroyElementRequestCommand {
    const elementRequestId = parseInt(request.params.id);

    if (!elementRequestId) {
      throw new ValidationException('El id de la solicitud de artículo es requerido');
    }

    if (elementRequestId < 1) {
      throw new ValidationException('El id de la solicitud de artículo no es válido');
    }

    return new DestroyElementRequestCommand(elementRequestId);
  }
}

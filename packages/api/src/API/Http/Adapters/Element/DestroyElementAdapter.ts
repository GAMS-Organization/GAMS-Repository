import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyElementCommand from '../../../../Application/Commands/Element/DestroyElementCommand';

@injectable()
export default class DestroyElementAdapter {
  public from(request: Request): DestroyElementCommand {
    const elementId = parseInt(request.params.id);

    if (!elementId) {
      throw new ValidationException('El id del elemento es requerido');
    }

    if (elementId < 1) {
      throw new ValidationException('El id del elemento no es válido');
    }

    return new DestroyElementCommand(elementId);
  }
}

import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyToolCommand from '../../../../Application/Commands/Tool/DestroyToolCommand';

@injectable()
export default class DestroyToolAdapter {
  public from(request: Request): DestroyToolCommand {
    const toolId = parseInt(request.params.id);

    if (!toolId) {
      throw new ValidationException('El id de la herramienta es requerido');
    }

    if (toolId < 1) {
      throw new ValidationException('El id de la herramienta no es válido');
    }

    return new DestroyToolCommand(toolId);
  }
}

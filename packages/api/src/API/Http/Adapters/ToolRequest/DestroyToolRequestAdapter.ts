import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyToolRequestCommand from '../../../../Application/Commands/ToolRequest/DestroyToolRequestCommand';

@injectable()
export default class DestroyToolRequestAdapter {
  public from(request: Request): DestroyToolRequestCommand {
    const toolRequestId = parseInt(request.params.id);

    if (!toolRequestId) {
      throw new ValidationException('El id de la solicitud de herramienta es requerido');
    }

    if (toolRequestId < 1) {
      throw new ValidationException('El id de la solicitud de herramienta no es válido');
    }

    return new DestroyToolRequestCommand(toolRequestId);
  }
}

import ShowElementCommand from '../../../../Application/Commands/Element/ShowElementCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowElementAdapter {
  public from(request: Request): ShowElementCommand {
    const elementId = parseInt(request.params.id);

    if (!elementId) {
      throw new ValidationException('El id del elemento es requerido');
    }

    if (elementId < 1) {
      throw new ValidationException('El id del elemento no es válido');
    }

    return new ShowElementCommand(elementId);
  }
}

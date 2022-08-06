import ShowElementsByAreaCommand from '../../../../Application/Commands/Element/ShowElementsByAreaCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowElementsByAreaAdapter {
  public from(request: Request): ShowElementsByAreaCommand {
    const areaId = parseInt(request.params.id);

    if (!areaId) {
      throw new ValidationException('El id del área es requerido');
    }

    if (areaId < 1) {
      throw new ValidationException('AEl id del área no es válido');
    }

    return new ShowElementsByAreaCommand(areaId);
  }
}

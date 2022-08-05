import ShowServiceCommand from '../../../../Application/Commands/Service/ShowServiceCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowServiceAdapter {
  public from(request: Request): ShowServiceCommand {
    const name = request.params.name.replace(/-/gi, ' ');

    if (!name) {
      throw new ValidationException('El id del servicio es requerido');
    }

    return new ShowServiceCommand(name);
  }
}

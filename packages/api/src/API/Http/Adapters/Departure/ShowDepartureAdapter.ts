import ShowDepartureCommand from '../../../../Application/Commands/Departure/ShowDepartureCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowDepartureAdapter {
  public from(request: Request): ShowDepartureCommand {
    const departureId = parseInt(request.params.id);

    if (!departureId) {
      throw new ValidationException('El id de la salida es requerido');
    }

    if (departureId < 1) {
      throw new ValidationException('El id de la salida no es válido');
    }

    return new ShowDepartureCommand(departureId);
  }
}

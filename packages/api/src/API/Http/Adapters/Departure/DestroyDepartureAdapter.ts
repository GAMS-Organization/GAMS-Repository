import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyDepartureCommand from '../../../../Application/Commands/Departure/DestroyDepartureCommand';

@injectable()
export default class DestroyDepartureAdapter {
  public from(request: Request): DestroyDepartureCommand {
    const departureId = parseInt(request.params.id);

    if (!departureId) {
      throw new ValidationException('Departure id are required');
    }

    if (departureId < 1) {
      throw new ValidationException('Departure id is not valid');
    }

    return new DestroyDepartureCommand(departureId);
  }
}

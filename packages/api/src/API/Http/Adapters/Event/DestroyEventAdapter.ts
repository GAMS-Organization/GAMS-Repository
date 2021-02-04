import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyEventCommand from '../../../../Application/Commands/Event/DestroyEventCommand';

@injectable()
export default class DestroyEventAdapter {
  public from(request: Request): DestroyEventCommand {
    const eventId = parseInt(request.params.id);

    if (!eventId) {
      throw new ValidationException('Event id are required');
    }

    if (eventId < 1) {
      throw new ValidationException('Event id is not valid');
    }

    return new DestroyEventCommand(eventId);
  }
}

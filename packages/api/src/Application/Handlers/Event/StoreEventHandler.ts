import { inject, injectable } from 'inversify';
import StoreEventCommand from '../../Commands/Event/StoreEventCommand';
import Event from '../../../Domain/Entities/Event';
import EventService from '../../../Domain/Services/EventService';

@injectable()
export default class StoreEventHandler {
  private eventService: EventService;
  public constructor(@inject(EventService) eventService: EventService) {
    this.eventService = eventService;
  }

  public async execute(command: StoreEventCommand): Promise<Event> {
    const event = new Event(
      command.getTitle(),
      command.getDescription(),
      command.getStartDate(),
      command.getEndDate(),
      command.getAllDay(),
    );
    return await this.eventService.setUserToEvent(await this.eventService.storeEvent(event), command.getWorkersId());
  }

  //Hay que crear toda la base de datos nueva y ver si funciona el servicio este
}

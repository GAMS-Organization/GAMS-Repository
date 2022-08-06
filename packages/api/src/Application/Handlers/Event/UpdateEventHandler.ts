import { inject, injectable } from 'inversify';
import UpdateEventCommand from '../../Commands/Event/UpdateEventCommand';
import Event from '../../../Domain/Entities/Event';
import EventService from '../../../Domain/Services/EventService';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IEventRepository from '../../../Domain/Interfaces/IEventRepository';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';

@injectable()
export default class UpdateEventHandler {
  private eventService: EventService;
  private eventRepository: IEventRepository;
  public constructor(
    @inject(EventService) eventService: EventService,
    @inject(INTERFACES.IEventRepository) eventRepository: IEventRepository,
  ) {
    this.eventService = eventService;
    this.eventRepository = eventRepository;
  }

  public async execute(command: UpdateEventCommand): Promise<Event> {
    const event = await this.eventRepository.findOneById(command.getId());
    if (!event) {
      throw new EntityNotFoundException(`No se encontró el evento con id: ${command.getId()}`);
    }

    event.setTitle(command.getTitle());
    event.setAllDay(command.getAllDay());
    event.setDescription(command.getDescription());
    //@ts-ignore
    event.setEndDate(command.getEndDate());
    //@ts-ignore
    event.setStartDate(command.getStartDate());

    if (event.getWorkersId() !== command.getWorkersId()) {
      return await this.eventService.updateUserToEvent(
        await this.eventService.storeEvent(event),
        command.getWorkersId(),
      );
    }

    return await this.eventService.storeEvent(event);
  }
}

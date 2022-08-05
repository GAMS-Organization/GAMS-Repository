import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IEventRepository from '../../../Domain/Interfaces/IEventRepository';
import DestroyEventCommand from '../../Commands/Event/DestroyEventCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import EventService from '../../../Domain/Services/EventService';

@injectable()
export default class DestroyEventHandler {
  private eventRepository: IEventRepository;
  private eventService: EventService;

  public constructor(
    @inject(INTERFACES.IEventRepository) eventRepository: IEventRepository,
    @inject(EventService) eventService: EventService,
  ) {
    this.eventRepository = eventRepository;
    this.eventService = eventService;
  }

  public async execute(command: DestroyEventCommand): Promise<boolean> {
    const event = await this.eventRepository.findOneById(command.getId());

    if (!event) {
      throw new EntityNotFoundException(`No se encontró el evento con id: ${command.getId()}`);
    }

    const eventWasDestroyed = await this.eventService.destroyEvent(event);

    if (!eventWasDestroyed) {
      throw new CannotDeleteEntity(`No se pudo borrar el evento con id: ${command.getId()}`);
    }

    return eventWasDestroyed;
  }
}

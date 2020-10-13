import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreEventCommand from '../../Commands/Event/StoreEventCommand';
import Event from '../../../Domain/Entities/Event';
import IEventRepository from '../../../Domain/Interfaces/IEventRepository';

@injectable()
export default class StoreEventHandler {
  private eventRepository: IEventRepository;
  public constructor(@inject(INTERFACES.IEventRepository) eventRepository: IEventRepository) {
    this.eventRepository = eventRepository;
  }

  public async execute(command: StoreEventCommand): Promise<Event> {
    const event = new Event(
      command.getTitle(),
      command.getDescription(),
      command.getStartDate(),
      command.getEndDate(),
      command.getAllDay(),
    );
    return await this.eventRepository.persist(event);
  }

  //Hay que agregar un servicio o algo para crear los UserEvent y asignarlos
}

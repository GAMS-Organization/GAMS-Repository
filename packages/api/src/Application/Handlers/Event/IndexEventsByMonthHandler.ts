import IEventRepository from '../../../Domain/Interfaces/IEventRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import IndexEventsByMonthCommand from '../../Commands/Event/IndexEventsByMonthCommand';
import Event from '../../../Domain/Entities/Event';

@injectable()
export default class IndexEventsByMonthHandler {
  private eventRepository: IEventRepository;

  public constructor(@inject(INTERFACES.IEventRepository) eventRepository: IEventRepository) {
    this.eventRepository = eventRepository;
  }

  public async execute(command: IndexEventsByMonthCommand): Promise<Event[]> {
    const events = await this.eventRepository.findAll();

    if (events) {
      return events.filter(event => parseInt(event.getStartDate().slice(3, 5)) === command.getMonth());
    }

    return events;
  }
}

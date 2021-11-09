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
    const month = command.getMonth();

    let date = new Date();
    let firstDay = new Date(date.getFullYear(), month - 1, 1);
    let lastDay = new Date(date.getFullYear(), month, 0);

    const firstDayString = `${firstDay.getFullYear()}-${firstDay.getMonth() + 1}-${firstDay.getDate()}`;
    const lastDayString = `${lastDay.getFullYear()}-${lastDay.getMonth() + 1}-${lastDay.getDate()}`;

    return await this.eventRepository.findMonthEvents(firstDayString, lastDayString);
  }
}

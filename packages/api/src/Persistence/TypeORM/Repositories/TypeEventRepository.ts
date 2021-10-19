import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import Event from '../../../Domain/Entities/Event';
import IEventRepository from '../../../Domain/Interfaces/IEventRepository';
import { Between } from 'typeorm';

@injectable()
export default class TypeEventRepository extends TypeRepository implements IEventRepository {
  public async findAll(): Promise<Event[]> {
    return await this.repository(Event).find({ relations: ['userEvents', 'userEvents.user'] });
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Event[]> {
    return await this.repository(Event).find({
      skip: initialIndex,
      take: limit,
      relations: ['userEvents', 'userEvents.user'],
    });
  }

  public async count(): Promise<number> {
    return await this.repository(Event).count();
  }

  public async findOneById(id: number): Promise<Event> {
    return await this.repository(Event).findOne({ where: { id: id }, relations: ['userEvents', 'userEvents.user'] });
  }

  public async persist(event: Event): Promise<Event> {
    return await this.repository(Event).save(event);
  }

  public async findWeekEvents(startDate: string, endDate: string): Promise<Event[]> {
    return await this.repository(Event).find({ startDate: Between(startDate, endDate) });
  }

  public async findMonthEvents(startDate: string, endDate: string): Promise<Event[]> {
    return await this.repository(Event).find({ startDate: Between(startDate, endDate) });
  }

  public async destroy(event: Event): Promise<boolean> {
    const result = await this.repository(Event).delete(event.getId());

    return result && result.affected === 1;
  }
}

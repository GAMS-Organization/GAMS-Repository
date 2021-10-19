import Event from '../Entities/Event';

export default interface IEventRepository {
  findAll(): Promise<Event[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Event[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<Event>;
  persist(event: Event): Promise<Event>;
  findWeekEvents(startDate: string, endDate: string): Promise<Event[]>;
  destroy(event: Event): Promise<boolean>;
}

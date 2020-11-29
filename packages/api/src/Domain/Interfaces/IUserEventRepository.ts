import UserEvent from '../Entities/UserEvent';

export default interface IUserEventRepository {
  findAll(): Promise<UserEvent[]>;
  findOneById(id: number): Promise<UserEvent>;
  findByUserId(userId: number): Promise<UserEvent[]>;
  findByEventId(eventId: number): Promise<UserEvent[]>;
  persist(userEvent: UserEvent): Promise<UserEvent>;
  destroy(userEvent: UserEvent): Promise<boolean>;
}

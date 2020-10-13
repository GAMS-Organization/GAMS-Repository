import IUserEventRepository from '../../../Domain/Interfaces/IUserEventRepository';
import UserEvent from '../../../Domain/Entities/UserEvent';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeUserEventRepository extends TypeRepository implements IUserEventRepository {
  public async findAll(): Promise<UserEvent[]> {
    return await this.repository(UserEvent).find();
  }

  public async findOneById(id: number): Promise<UserEvent> {
    return await this.repository(UserEvent).findOne(id);
  }

  public async findByUserId(id: number): Promise<UserEvent[]> {
    return await this.repository(UserEvent).find({ where: { user: id }, relations: ['user', 'event'] });
  }

  public async findByEventId(id: number): Promise<UserEvent[]> {
    return await this.repository(UserEvent).find({ where: { event: id }, relations: ['user', 'event'] });
  }

  public async persist(event: UserEvent): Promise<UserEvent> {
    return await this.repository(UserEvent).save(event);
  }

  public async destroy(event: UserEvent): Promise<boolean> {
    const result = await this.repository(UserEvent).delete(event.getId());

    return result && result.affected === 1;
  }
}

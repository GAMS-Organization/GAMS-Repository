import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import User from '../../../Domain/Entities/User';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeUserRepository extends TypeRepository implements IUserRepository {
  public async findAll(): Promise<User[]> {
    return await this.repository(User).find({
      relations: ['userRoles', 'userRoles.role'],
    });
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<User[]> {
    return await this.repository(User).find({
      relations: ['userRoles', 'userRoles.role'],
      skip: initialIndex,
      take: limit,
      order: {
        name: 'ASC',
      },
    });
  }

  public async count(): Promise<number> {
    return await this.repository(User).count();
  }

  public async findOneById(id: number): Promise<User> {
    return await this.repository(User).findOne(id, { relations: ['userRoles', 'userRoles.role'] });
  }

  public async findOneByUsername(email: string): Promise<User> {
    return await this.repository(User).findOne({
      relations: ['userRoles', 'userRoles.role'],
      where: { email: email },
    });
  }
  //@ts-ignore
  public async findByRole(role: string): Promise<User[]> {
    return await this.repository(User).find({
      relations: ['userRoles', 'userRoles.role'],
      where: { userRoles: { id: 2 } },
    });
  }

  public async persist(user: User): Promise<User> {
    return await this.repository(User).save(user);
  }

  public async destroy(user: User): Promise<boolean> {
    const result = await this.repository(User).delete(user.getId());

    return result && result.affected === 1;
  }
}

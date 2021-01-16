import { injectable } from 'inversify';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import User from '../../../Domain/Entities/User';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class EmptyUserRepository implements IUserRepository {
  public destroy(_user: User): Promise<boolean> {
    return Promise.resolve(true);
  }

  public findAll(): Promise<User[]> {
    return Promise.resolve([]);
  }

  public findOneById(_id: number): Promise<User> {
    return Promise.resolve(null);
  }

  public findByRole(_role: string): Promise<User[]> {
    return Promise.resolve([]);
  }

  public findOneByUsername(_username: string): Promise<User> {
    return Promise.resolve(null);
  }

  public persist(_user: User): Promise<User> {
    return Promise.resolve(null);
  }

  public findAllPaginated(_initialIndex: number, _limit: number): Promise<User[]> {
    return Promise.resolve([]);
  }
  public count(): Promise<number> {
    return Promise.resolve(null);
  }
}

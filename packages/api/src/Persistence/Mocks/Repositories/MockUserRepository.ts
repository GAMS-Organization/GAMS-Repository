import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import User from '../../../Domain/Entities/User';
import { injectable } from 'inversify';

@injectable()
// eslint-disable-next-line require-jsdoc
export default class MockUserRepository implements IUserRepository {
  public findAll(): Promise<User[]> {
    const sender = new User('Matias', 'Beltramone', 'mbeltramone@email.com');

    const receiver = new User('Matias', 'Beltramone', 'mbeltramone@email.com');

    return Promise.resolve([sender, receiver]);
  }

  public findAllPaginated(_initialIndex: number, _limit: number): Promise<User[]> {
    const sender = new User( 'Matias', 'Beltramone', 'mbeltramone@email.com');

    const receiver = new User( 'Matias', 'Beltramone', 'mbeltramone@email.com');

    return Promise.resolve([sender, receiver]);
  }

  public count(): Promise<number> {
    return Promise.resolve(1);
  }

  public async findOneById(_id: number): Promise<User> {
    const users = await this.findAll();

    return users[0];
  }

  public async findOneByUsername(_username: string): Promise<User> {
    const users = await this.findAll();

    return users[0];
  }

  public async persist(_user: User): Promise<User> {
    return new User( 'Matias', 'Beltramone', 'mbeltramone@email.com');
  }

  public async destroy(_user: User): Promise<boolean> {
    return Promise.resolve(true);
  }
}

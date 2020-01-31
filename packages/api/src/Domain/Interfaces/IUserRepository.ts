import User from '../Entities/User';

export default interface IUserRepository {
  findAll(): Promise<User[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<User[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<User>;
  findOneByUsername(email: string): Promise<User>;
  persist(user: User): Promise<User>;
  destroy(user: User): Promise<boolean>;
}

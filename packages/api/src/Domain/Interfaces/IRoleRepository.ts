import Role from '../Entities/Role';

export default interface IRoleRepository {
  findAll(): Promise<Role[]>;
  findOneById(id: number): Promise<Role>;
  findOneByRoleName(name: string): Promise<Role>;
  persist(role: Role): Promise<Role>;
  destroy(role: Role): Promise<boolean>;
}

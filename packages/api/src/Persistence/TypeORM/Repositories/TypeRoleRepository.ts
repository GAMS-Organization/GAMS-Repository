import IRoleRepository from '../../../Domain/Interfaces/IRoleRepository';
import Role from '../../../Domain/Entities/Role';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeRoleRepository extends TypeRepository implements IRoleRepository {
  public async findAll(): Promise<Role[]> {
    return await this.repository(Role).find();
  }

  public async findOneById(id: number): Promise<Role> {
    return await this.repository(Role).findOne(id);
  }

  public async findOneByRoleName(name: string): Promise<Role> {
    return await this.repository(Role).findOne({ where: { name: name } });
  }

  public async persist(role: Role): Promise<Role> {
    return await this.repository(Role).save(role);
  }

  public async destroy(role: Role): Promise<boolean> {
    const result = await this.repository(Role).delete(role.getId());

    return result && result.affected === 1;
  }
}

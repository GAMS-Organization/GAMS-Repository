import IUserRoleRepository from '../../../Domain/Interfaces/IUserRoleRepository';
import UserRole from '../../../Domain/Entities/UserRole';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeUserRoleRepository extends TypeRepository implements IUserRoleRepository {
  public async findAll(): Promise<UserRole[]> {
    return await this.repository(UserRole).find();
  }

  public async findOneById(id: number): Promise<UserRole> {
    return await this.repository(UserRole).findOne(id);
  }

  public async findByUserId(userId: number): Promise<UserRole[]> {
    return await this.repository(UserRole).find({ relations: ['role'], where: { user: userId } });
  }

  public async findByRole(roleId: number): Promise<UserRole[]> {
    return await this.repository(UserRole).find({ relations: ['user'], where: { role: roleId } });
  }

  public async persist(userRole: UserRole): Promise<UserRole> {
    return await this.repository(UserRole).save(userRole);
  }

  public async destroy(userRole: UserRole): Promise<boolean> {
    const result = await this.repository(UserRole).delete(userRole.getId());

    return result && result.affected === 1;
  }
}

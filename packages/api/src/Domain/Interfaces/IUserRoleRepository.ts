import UserRole from '../Entities/UserRole';

export default interface IUserRoleRepository {
  findAll(): Promise<UserRole[]>;
  findOneById(id: number): Promise<UserRole>;
  findByUserId(userId: number): Promise<UserRole[]>;
  findByRole(roleId: number): Promise<UserRole[]>;
  persist(userRole: UserRole): Promise<UserRole>;
  destroy(userRol: UserRole): Promise<boolean>;
}

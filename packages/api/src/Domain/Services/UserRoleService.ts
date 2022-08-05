import IUserRoleRepository from '../Interfaces/IUserRoleRepository';
import { inject, injectable } from 'inversify';
import IRoleRepository from '../Interfaces/IRoleRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import UserRole from '../Entities/UserRole';
import User from '../Entities/User';
import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';

@injectable()
export default class UserRoleService {
  private userRoleRepository: IUserRoleRepository;
  private roleRepository: IRoleRepository;

  public constructor(
    @inject(INTERFACES.IRoleRepository) roleRepository: IRoleRepository,
    @inject(INTERFACES.IUserRoleRepository) userRoleRepository: IUserRoleRepository,
  ) {
    this.roleRepository = roleRepository;
    this.userRoleRepository = userRoleRepository;
  }

  public async setUserRolesToUser(user: User, commandRoles: string[]): Promise<User> {
    const roles = await this.roleRepository.findAll();
    const validRoles: UserRole[] = [];

    for (const role of roles) {
      const roleName = role.getName();
      if (commandRoles.includes(roleName)) {
        await this.userRoleRepository.persist(new UserRole(user, role));
        validRoles.push(new UserRole(user, role));
      }
    }
    user.setUserRole(validRoles);
    return user;
  }

  public async destroyUserRolesFromUser(userId: number): Promise<void> {
    const userRoles = await this.userRoleRepository.findByUserId(userId);
    for (const userRole of userRoles) {
      try {
        await this.userRoleRepository.destroy(userRole);
      } catch (e) {
        throw new CannotDeleteEntity(`No se pudo borrar el rol-usuario con id: ${userRole.getId()}`);
      }
    }
  }
}

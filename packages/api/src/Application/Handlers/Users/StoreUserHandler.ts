import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreUserCommand from '../../Commands/Users/StoreUserCommand';
import User from '../../../Domain/Entities/User';
import UserRoleService from '../../../Domain/Services/UserRoleService';

@injectable()
export default class StoreUserHandler {
  private userRepository: IUserRepository;
  private userRoleService: UserRoleService;
  public constructor(
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(UserRoleService) userRoleService: UserRoleService,
  ) {
    this.userRepository = userRepository;
    this.userRoleService = userRoleService;
  }

  public async execute(command: StoreUserCommand): Promise<User> {
    const user = new User(command.getName(), command.getSurname(), command.getEmail());
    user.hashPassword(command.getPassword());
    return this.userRoleService.setUserRolesToUser(await this.userRepository.persist(user), command.getRoles());
  }
}

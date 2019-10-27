import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateUserCommand from '../../Commands/Users/UpdateUserCommand';
import User from '../../../Domain/Entities/User';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import UserRoleService from '../../../Domain/Services/UserRoleService';

@injectable()
export default class UpdateUserHandler {
  private userRepository: IUserRepository;
  private userRoleService: UserRoleService;
  public constructor(
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(UserRoleService) userRoleService: UserRoleService,
  ) {
    this.userRepository = userRepository;
    this.userRoleService = userRoleService;
  }

  public async execute(command: UpdateUserCommand): Promise<User> {
    const user = await this.userRepository.findOneById(command.getId());
    if (!user) {
      throw new EntityNotFoundException(`User with id: ${command.getId()} not found`);
    }
    user.setName(command.getName());
    user.setSurname(command.getSurname());
    user.setEmail(command.getEmail());
    user.setUserState(command.getUserState());
    user.setUsername(command.getUsername());
    await this.userRoleService.destroyUserRolesFromUser(command.getId());
    return await this.userRoleService.setUserRolesToUser(await this.userRepository.persist(user), command.getRoles());
  }
}

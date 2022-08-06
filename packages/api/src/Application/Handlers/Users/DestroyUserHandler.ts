import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import DestroyUserCommand from '../../Commands/Users/DestroyUserCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import UserRoleService from '../../../Domain/Services/UserRoleService';

@injectable()
export default class DestroyUserHandler {
  private userRepository: IUserRepository;
  private userRoleService: UserRoleService;

  public constructor(
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(UserRoleService) userRoleService: UserRoleService,
  ) {
    this.userRepository = userRepository;
    this.userRoleService = userRoleService;
  }

  public async execute(command: DestroyUserCommand): Promise<boolean> {
    const user = await this.userRepository.findOneById(command.getId());

    if (!user) {
      throw new EntityNotFoundException(`No se encontró el usuario con id: ${command.getId()}`);
    }
    await this.userRoleService.destroyUserRolesFromUser(user.id);
    const userWasDestroyed = await this.userRepository.destroy(user);

    if (!userWasDestroyed) {
      throw new CannotDeleteEntity(`No se pudo borrar el usuario con id: ${command.getId()}`);
    }

    return userWasDestroyed;
  }
}

import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import DisableUserCommand from '../../Commands/Users/DisableUserCommand';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import { UserStates } from '../../../Domain/Enums/UserStates';
import User from '../../../Domain/Entities/User';

@injectable()
export default class DisableUserHandler {
  private userRepository: IUserRepository;

  public constructor(@inject(INTERFACES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(command: DisableUserCommand): Promise<User> {
    const user = await this.userRepository.findOneById(command.getId());

    if (!user) {
      throw new EntityNotFoundException(`No se encontró el usuario con id: ${command.getId()}`);
    }
    user.setUserState(UserStates.user_inactive);
    return await this.userRepository.persist(user);
  }
}

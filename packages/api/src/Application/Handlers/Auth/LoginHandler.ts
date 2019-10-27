import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import LoginCommand from '../../Commands/Auth/LoginCommand';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import * as jwt from 'jsonwebtoken';
import jwtConfig from '../../../config/jwtConfig';
import User from '../../../Domain/Entities/User';
import { UserStates } from '../../../Domain/Enums/UserStates';
import AuthorizationFailed from '../../Exceptions/AuthorizationFailed';

@injectable()
export default class LoginHandler {
  private userRepository: IUserRepository;

  public constructor(@inject(INTERFACES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(command: LoginCommand): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findOneByUsername(command.getUsername());

    if (!user) {
      throw new EntityNotFoundException(`User with id: ${command.getUsername()} not found`);
    }
    if (user.getUserState() == UserStates.user_inactive) {
      throw new AuthorizationFailed(`User with username: ${command.getUsername()} is inactive.`);
    }
    if (user.checkIfUnencryptedPasswordIsValid(command.getPassword())) {
      const token = jwt.sign(
        { userId: user.id, username: user.username, roles: user.getRolesFromUserRole() },
        jwtConfig.jwtSecret,
        {
          expiresIn: jwtConfig.expirationTime,
        },
      );
      return { user, token };
    } else {
      throw new AuthorizationFailed(`Wrong password on User with username: ${command.getUsername()}`);
    }
  }
}

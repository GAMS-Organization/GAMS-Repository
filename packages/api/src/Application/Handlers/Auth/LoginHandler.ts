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
import { sendEmail } from '../../../Domain/Services/Mailer/MailerService';

@injectable()
export default class LoginHandler {
  private userRepository: IUserRepository;

  public constructor(@inject(INTERFACES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(command: LoginCommand): Promise<{ user: User; token: string }> {
    sendEmail();

    const user = await this.userRepository.findOneByUsername(command.getEmail());

    if (!user) {
      throw new EntityNotFoundException(`User with id: ${command.getEmail()} not found`);
    }
    if (user.getUserState() == UserStates.user_inactive) {
      throw new AuthorizationFailed(`User with email: ${command.getEmail()} is inactive.`);
    }
    if (user.checkIfUnencryptedPasswordIsValid(command.getPassword())) {
      const token = jwt.sign(
        { userId: user.id, email: user.email, roles: user.getRolesFromUserRole() },
        jwtConfig.jwtSecret,
        {
          expiresIn: jwtConfig.expirationTime,
        },
      );
      return { user, token };
    } else {
      throw new AuthorizationFailed(`Wrong password on User with email: ${command.getEmail()}`);
    }
  }
}

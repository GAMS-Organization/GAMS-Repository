import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IUserRepository from '../Interfaces/IUserRepository';
import User from '../Entities/User';
import IUserRoleRepository from '../Interfaces/IUserRoleRepository';
import UserRole from '../Entities/UserRole';

@injectable()
export default class UserService {
  private userRepository: IUserRepository;
  private userRoleRepository: IUserRoleRepository;

  public constructor(
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(INTERFACES.IUserRoleRepository) userRoleRepository: IUserRoleRepository,
  ) {
    this.userRepository = userRepository;
    this.userRoleRepository = userRoleRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const userQuantity = await this.userRepository.count();
    const users = await this.userRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: users,
      dataLength: users.length,
      totalDataQuantity: userQuantity,
      totalPages: Math.ceil(userQuantity / itemsPerPage),
    };
  }

  public async findByRole(roleId: number): Promise<User[]> {
    const usersRole = await this.userRoleRepository.findByRole(roleId);
    return usersRole.map((userRole: UserRole) => {
      return userRole.getUser();
    });
  }

  public async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneById(id);
  }
}

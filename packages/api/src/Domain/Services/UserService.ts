import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IUserRepository from '../Interfaces/IUserRepository';
import User from '../Entities/User';

@injectable()
export default class UserService {
  private userRepository: IUserRepository;

  public constructor(@inject(INTERFACES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
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

  public async findByRole(role: string): Promise<User[]> {
    return await this.userRepository.findByRole(role);
  }

  public async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneById(id);
  }
}

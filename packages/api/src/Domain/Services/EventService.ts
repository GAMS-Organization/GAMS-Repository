import { inject, injectable } from 'inversify';
import IUserRepository from '../Interfaces/IUserRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import Event from '../Entities/Event';
import IUserEventRepository from '../Interfaces/IUserEventRepository';
import IEventRepository from '../Interfaces/IEventRepository';
import UserEvent from '../Entities/UserEvent';

@injectable()
export default class UserRoleService {
  private userEventRepository: IUserEventRepository;
  private userRepository: IUserRepository;
  private eventRepository: IEventRepository;

  public constructor(
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(INTERFACES.IEventRepository) eventRepository: IEventRepository,
    @inject(INTERFACES.IUserEventRepository) userEventRepository: IUserEventRepository,
  ) {
    this.userRepository = userRepository;
    this.eventRepository = eventRepository;
    this.userEventRepository = userEventRepository;
  }

  public async storeEvent(event: Event): Promise<Event> {
    return await this.eventRepository.persist(event);
  }

  public async setUserToEvent(event: Event, commandWorkers: number[]): Promise<Event> {
    const users = await this.userRepository.findAll();

    for (const user of users) {
      const userId = user.getId();
      if (commandWorkers.includes(userId)) {
        await this.userEventRepository.persist(new UserEvent(user, event));
      }
    }
    return event;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const entriesQuantity = await this.eventRepository.count();
    const entries = await this.eventRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: entries,
      dataLength: entries.length,
      totalDataQuantity: entriesQuantity,
      totalPages: Math.ceil(entriesQuantity / itemsPerPage),
    };
  }

  //public async destroyUserRolesFromUser(userId: number): Promise<void> {
  //  const userRoles = await this.userRoleRepository.findByUserId(userId);
  //  for (const userRole of userRoles) {
  //    try {
  //      await this.userRoleRepository.destroy(userRole);
  //    } catch (e) {
  //      throw new CannotDeleteEntity(`UserRole with id: ${userRole.getId()} could not be deleted`);
  //    }
  //  }
  //}
}

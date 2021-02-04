import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IWorkOrderRepository from '../Interfaces/IWorkOrderRepository';
import WorkOrder from '../Entities/WorkOrder';
import User from '../Entities/User';
import IUserWorkOrderRepository from '../Interfaces/IUserWorkOrderRepository';
import UserWorkOrder from '../Entities/UserWorkOrder';
import EntityNotFoundException from '../../Application/Exceptions/EntityNotFoundException';

@injectable()
export default class WorkOrderService {
  private workOrderRepository: IWorkOrderRepository;
  private userWorkOrderRepository: IUserWorkOrderRepository;

  public constructor(
    @inject(INTERFACES.IWorkOrderRepository) workOrderRepository: IWorkOrderRepository,
    @inject(INTERFACES.IUserWorkOrderRepository) userWorkOrderRepository: IUserWorkOrderRepository,
  ) {
    this.workOrderRepository = workOrderRepository;
    this.userWorkOrderRepository = userWorkOrderRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const workOrderQuantity = await this.workOrderRepository.count();
    const workOrders = await this.workOrderRepository.findAllPaginated(
      itemsPerPage * page - itemsPerPage,
      itemsPerPage,
    );
    return {
      data: workOrders,
      dataLength: workOrders.length,
      totalDataQuantity: workOrderQuantity,
      totalPages: Math.ceil(workOrderQuantity / itemsPerPage),
    };
  }

  public async returnAllPaginatedByAuthor(
    userId: number,
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const workOrderQuantity = await this.workOrderRepository.countByUser(userId);
    const workOrders = await this.workOrderRepository.findByUserId(
      userId,
      itemsPerPage * page - itemsPerPage,
      itemsPerPage,
    );
    return {
      data: workOrders,
      dataLength: workOrders.length,
      totalDataQuantity: workOrderQuantity,
      totalPages: Math.ceil(workOrderQuantity / itemsPerPage),
    };
  }

  public async returnAllPaginatedByWorker(
    userId: number,
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const workOrderQuantity = await this.userWorkOrderRepository.countByUserId(userId);
    const userWorkOrders = await this.userWorkOrderRepository.findByUserId(
      userId,
      itemsPerPage * page - itemsPerPage,
      itemsPerPage,
    );
    const workOrders = userWorkOrders.map(userWorkOrder => {
      return userWorkOrder.workOrder;
    });
    return {
      data: workOrders,
      dataLength: userWorkOrders.length,
      totalDataQuantity: workOrderQuantity,
      totalPages: Math.ceil(workOrderQuantity / itemsPerPage),
    };
  }

  public async updateWorkers(workOrder: WorkOrder, workers: User[]): Promise<WorkOrder> {
    let error = false;
    for (const worker of workers) {
      if (worker.getRolesFromUserRole()[0] === 'user') {
        error = true;
      }
    }
    if (error) {
      throw new EntityNotFoundException(`One WorkerUser at least has a invalid rol account`);
    }

    const workOrders = workOrder.getUserWorkOrders();
    if (workOrders) {
      for (const userWorkOrder of workOrders) {
        await this.userWorkOrderRepository.destroy(userWorkOrder);
      }
    }

    for (const worker of workers) {
      await this.userWorkOrderRepository.persist(new UserWorkOrder(worker, workOrder));
    }

    return this.workOrderRepository.findOneById(workOrder.id);
  }
}

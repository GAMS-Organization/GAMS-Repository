import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IWorkOrderRepository from '../Interfaces/IWorkOrderRepository';

@injectable()
export default class WorkOrderService {
  private workOrderRepository: IWorkOrderRepository;

  public constructor(@inject(INTERFACES.IWorkOrderRepository) workOrderRepository: IWorkOrderRepository) {
    this.workOrderRepository = workOrderRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const workOrderQuantity = await this.workOrderRepository.count();
    const workOrders = await this.workOrderRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: workOrders,
      dataLength: workOrders.length,
      totalDataQuantity: workOrderQuantity,
      totalPages: Math.ceil(workOrderQuantity / itemsPerPage),
    };
  }
}

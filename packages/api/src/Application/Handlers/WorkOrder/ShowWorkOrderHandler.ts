import IWorkOrderRepository from '../../../Domain/Interfaces/IWorkOrderRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import ShowWorkOrderCommand from '../../Commands/WorkOrder/ShowWorkOrderCommand';
import WorkOrder from '../../../Domain/Entities/WorkOrder';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class ShowWorkOrderHandler {
  private workOrderRepository: IWorkOrderRepository;

  public constructor(@inject(INTERFACES.IWorkOrderRepository) workOrderRepository: IWorkOrderRepository) {
    this.workOrderRepository = workOrderRepository;
  }

  public async execute(command: ShowWorkOrderCommand): Promise<WorkOrder> {
    const workOrder = await this.workOrderRepository.findOneById(command.getId());
    if (!workOrder) {
      throw new EntityNotFoundException(`WorkOrder with id: ${command.getId()} not found`);
    }
    return workOrder;
  }
}

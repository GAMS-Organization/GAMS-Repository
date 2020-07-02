import IWorkOrderRepository from '../../../Domain/Interfaces/IWorkOrderRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import CancelWorkOrderCommand from '../../Commands/WorkOrder/CancelWorkOrderCommand';
import WorkOrder from '../../../Domain/Entities/WorkOrder';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import { STATE } from '../../../API/Http/Enums/WorkOrder';

@injectable()
export default class CancelWorkOrderHandler {
  private workOrderRepository: IWorkOrderRepository;
  private userRepository: IUserRepository;
  public constructor(
    @inject(INTERFACES.IWorkOrderRepository) workOrderRepository: IWorkOrderRepository,
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
  ) {
    this.workOrderRepository = workOrderRepository;
    this.userRepository = userRepository;
  }

  public async execute(command: CancelWorkOrderCommand): Promise<WorkOrder> {
    const user = await this.userRepository.findOneById(command.getUserId());

    const workOrder = await this.workOrderRepository.findOneById(command.getId());
    if (!workOrder) {
      throw new EntityNotFoundException(`WorkOrder with id: ${command.getId()} not found`);
    }

    if (user.getRolesFromUserRole()[0] === 'user') {
      if (user !== workOrder.getUser()) {
        throw new EntityNotFoundException(`Can not cancel the work order, you are not the author`);
      }
      if (workOrder.getState() !== STATE.FREE) {
        throw new EntityNotFoundException(
          `Can not cancel the work order, it is already on state: ${workOrder.getState()}`,
        );
      }
    }

    workOrder.setState(STATE.CANCELED);
    workOrder.setTaskDescription(command.getTaskDescription());

    return await this.workOrderRepository.persist(workOrder);
  }
}

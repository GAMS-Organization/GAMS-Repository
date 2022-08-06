import IWorkOrderRepository from '../../../Domain/Interfaces/IWorkOrderRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import AssignWorkOrderCommand from '../../Commands/WorkOrder/AssignWorkOrderCommand';
import WorkOrder from '../../../Domain/Entities/WorkOrder';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import WorkOrderService from '../../../Domain/Services/WorkOrderService';
import { STATE } from '../../../API/Http/Enums/WorkOrder';

@injectable()
export default class AssignWorkOrderHandler {
  private workOrderRepository: IWorkOrderRepository;
  private userRepository: IUserRepository;
  private workOrderService: WorkOrderService;
  public constructor(
    @inject(INTERFACES.IWorkOrderRepository) workOrderRepository: IWorkOrderRepository,
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(WorkOrderService) workOrderService: WorkOrderService,
  ) {
    this.workOrderRepository = workOrderRepository;
    this.userRepository = userRepository;
    this.workOrderService = workOrderService;
  }

  public async execute(command: AssignWorkOrderCommand): Promise<WorkOrder> {
    const workOrder = await this.workOrderRepository.findOneById(command.getId());
    if (!workOrder) {
      throw new EntityNotFoundException(`No se encontró la orden de trabajo con id: ${command.getId()}`);
    }
    //@ts-ignore
    workOrder.setStartDate(command.getStartDate());
    workOrder.setState(STATE.ASSIGNED);

    const workers = [];
    for (const workerId of command.getWorkersId()) {
      const worker = await this.userRepository.findOneById(workerId);
      if (!worker) {
        throw new EntityNotFoundException(`No se encontró el responsable con id: ${workerId}`);
      }
      workers.push(worker);
    }

    return await this.workOrderService.updateWorkers(await this.workOrderRepository.persist(workOrder), workers);
  }
}

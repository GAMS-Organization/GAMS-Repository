import IWorkOrderRepository from '../../../Domain/Interfaces/IWorkOrderRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import TakeWorkOrderCommand from '../../Commands/WorkOrder/TakeWorkOrderCommand';
import WorkOrder from '../../../Domain/Entities/WorkOrder';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import WorkOrderService from '../../../Domain/Services/WorkOrderService';
import { STATE } from '../../../API/Http/Enums/WorkOrder';

@injectable()
export default class TakeWorkOrderHandler {
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

  public async execute(command: TakeWorkOrderCommand): Promise<WorkOrder> {
    const workOrder = await this.workOrderRepository.findOneById(command.getId());
    if (!workOrder) {
      throw new EntityNotFoundException(`No se encontró la orden de trabajo con id: ${command.getId()}`);
    } //@ts-ignore
    workOrder.setStartDate(command.getStartDate());
    workOrder.setState(STATE.TAKEN);

    const workers = [];
    const workersId = await workOrder.getWorkersIdByUserWorkOrders();
    for (const workerId of workersId) {
      const worker = await this.userRepository.findOneById(workerId);
      if (worker.getId() !== command.getWorkerId()) {
        workers.push(worker);
      }
    }
    const worker = await this.userRepository.findOneById(command.getWorkerId());
    if (!worker) {
      throw new EntityNotFoundException(`No se encontró el responsable con id: ${command.getWorkerId()}`);
    }
    workers.push(worker);

    return await this.workOrderService.updateWorkers(await this.workOrderRepository.persist(workOrder), workers);
  }
}

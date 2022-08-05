import IWorkOrderRepository from '../../../Domain/Interfaces/IWorkOrderRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateWorkOrderCommand from '../../Commands/WorkOrder/UpdateWorkOrderCommand';
import WorkOrder from '../../../Domain/Entities/WorkOrder';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import IAssetRepository from '../../../Domain/Interfaces/IAssetRepository';
import WorkOrderService from '../../../Domain/Services/WorkOrderService';

@injectable()
export default class UpdateWorkOrderHandler {
  private workOrderRepository: IWorkOrderRepository;
  private userRepository: IUserRepository;
  private assetRepository: IAssetRepository;
  private workOrderService: WorkOrderService;
  public constructor(
    @inject(INTERFACES.IWorkOrderRepository) workOrderRepository: IWorkOrderRepository,
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(INTERFACES.IAssetRepository) assetRepository: IAssetRepository,
    @inject(WorkOrderService) workOrderService: WorkOrderService,
  ) {
    this.workOrderRepository = workOrderRepository;
    this.userRepository = userRepository;
    this.assetRepository = assetRepository;
    this.workOrderService = workOrderService;
  }

  public async execute(command: UpdateWorkOrderCommand): Promise<WorkOrder> {
    const workOrder = await this.workOrderRepository.findOneById(command.getId());
    if (!workOrder) {
      throw new EntityNotFoundException(`No se encontró la orden de trabajo con id: ${command.getId()}`);
    } //@ts-ignore
    workOrder.getOrderDate() !== command.getOrderDate() ? workOrder.setOrderDate(command.getOrderDate()) : null;
    //@ts-ignore
    workOrder.getStartDate() !== command.getStartDate() ? workOrder.setStartDate(command.getStartDate()) : null;
    //@ts-ignore
    workOrder.getRealizationDate() !== command.getRealizationDate()
      ? //@ts-ignore
        workOrder.setRealizationDate(command.getRealizationDate())
      : null;
    workOrder.getPriority() !== command.getPriority() ? workOrder.setPriority(command.getPriority()) : null;
    workOrder.getState() !== command.getState() ? workOrder.setState(command.getState()) : null;
    workOrder.getComment() !== command.getComment() ? workOrder.setComment(command.getComment()) : null;
    workOrder.getTaskDescription() !== command.getTaskDescription()
      ? workOrder.setTaskDescription(command.getTaskDescription())
      : null;

    const asset = await this.assetRepository.findOneById(command.getAssetId());
    if (!asset) {
      throw new EntityNotFoundException(`No se encontró el activo con id: ${command.getAssetId()}`);
    }
    workOrder.getAsset() !== asset ? workOrder.setAsset(asset) : null;

    const user = await this.userRepository.findOneById(command.getUserId());
    if (!user) {
      throw new EntityNotFoundException(`No se encontró el usuario con id: ${command.getUserId()}`);
    }
    workOrder.getUser() !== user ? workOrder.setUser(user) : null;

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

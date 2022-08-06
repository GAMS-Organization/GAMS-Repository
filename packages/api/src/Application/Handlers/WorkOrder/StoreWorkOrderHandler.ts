import IProductRepository from '../../../Domain/Interfaces/IWorkOrderRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreWorkOrderCommand from '../../Commands/WorkOrder/StoreWorkOrderCommand';
import WorkOrder from '../../../Domain/Entities/WorkOrder';
import IAssetRepository from '../../../Domain/Interfaces/IAssetRepository';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';

@injectable()
export default class StoreWorkOrderHandler {
  private workOrderRepository: IProductRepository;
  private assetRepository: IAssetRepository;
  private userRepository: IUserRepository;

  public constructor(
    @inject(INTERFACES.IWorkOrderRepository) workOrderRepository: IProductRepository,
    @inject(INTERFACES.IAssetRepository) assetRepository: IAssetRepository,
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
  ) {
    this.workOrderRepository = workOrderRepository;
    this.assetRepository = assetRepository;
    this.userRepository = userRepository;
  }

  public async execute(command: StoreWorkOrderCommand): Promise<WorkOrder> {
    const asset = await this.assetRepository.findOneById(command.getAssetId());

    if (!asset) {
      throw new EntityNotFoundException(`No se encontró el activo con id: ${command.getAssetId()}`);
    }

    const user = await this.userRepository.findOneById(command.getUserId());

    if (!user) {
      throw new EntityNotFoundException(`No se encontró el usuario con id: ${command.getUserId()}`);
    }
    //@ts-ignore
    const workOrder = new WorkOrder(command.getOrderDate(), command.getpriority(), command.getComment(), asset, user);

    const workOrderCreated = await this.workOrderRepository.persist(workOrder);

    return await this.workOrderRepository.findOneById(workOrderCreated.id);
  }
}

import IWorkOrderRepository from '../../../Domain/Interfaces/IWorkOrderRepository';
import WorkOrder from '../../../Domain/Entities/WorkOrder';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeWorkOrderRepository extends TypeRepository implements IWorkOrderRepository {
  public async findAll(): Promise<WorkOrder[]> {
    return await this.repository(WorkOrder).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<WorkOrder[]> {
    return await this.repository(WorkOrder).find({
      skip: initialIndex,
      take: limit,
      relations: [
        'user',
        'asset',
        'userWorkOrders',
        'userWorkOrders.user',
        'asset.area',
        'asset.sector',
        'asset.service',
        'asset.element',
      ],
    });
  }

  public async count(): Promise<number> {
    return await this.repository(WorkOrder).count();
  }

  public async countByUser(userId: number): Promise<number> {
    return await this.repository(WorkOrder).count({ where: { user: userId }, relations: ['user'] });
  }

  public async countByWorker(userWorkerId: number): Promise<number> {
    return await this.repository(WorkOrder).count({
      where: { userWorkOrders: userWorkerId },
      relations: ['user_work_order'],
    });
  }

  public async findOneById(id: number): Promise<WorkOrder> {
    return await this.repository(WorkOrder).findOne({
      where: { id: id },
      relations: [
        'user',
        'asset',
        'userWorkOrders',
        'userWorkOrders.user',
        'asset.area',
        'asset.sector',
        'asset.service',
        'asset.element',
      ],
    });
  }

  public async findByUserId(id: number, initialIndex: number, limit: number): Promise<WorkOrder[]> {
    return await this.repository(WorkOrder).find({
      where: { user: id },
      relations: [
        'user',
        'asset',
        'userWorkOrders',
        'userWorkOrders.user',
        'asset.area',
        'asset.sector',
        'asset.service',
        'asset.element',
      ],
      skip: initialIndex,
      take: limit,
    });
  }

  public async findByAssetId(id: number): Promise<WorkOrder[]> {
    return await this.repository(WorkOrder).find({ where: { asset: id }, relations: ['asset'] });
  }

  public async persist(workOrder: WorkOrder): Promise<WorkOrder> {
    return await this.repository(WorkOrder).save(workOrder);
  }

  public async destroy(workOrder: WorkOrder): Promise<boolean> {
    const result = await this.repository(WorkOrder).delete(workOrder.getId());

    return result && result.affected === 1;
  }
}

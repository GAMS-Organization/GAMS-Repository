import WorkOrder from '../Entities/WorkOrder';

export default interface IWorkOrderRepository {
  findAll(): Promise<WorkOrder[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<WorkOrder[]>;
  findAllUnfinished(): Promise<WorkOrder[]>;
  count(): Promise<number>;
  countByUser(userId: number): Promise<number>;
  findOneById(id: number): Promise<WorkOrder>;
  findByUserId(userId: number, initialIndex: number, limit: number): Promise<WorkOrder[]>;
  findByAssetId(assetId: number): Promise<WorkOrder[]>;
  persist(workOrder: WorkOrder): Promise<WorkOrder>;
  destroy(workOrder: WorkOrder): Promise<boolean>;
}

import UserWorkOrder from '../Entities/UserWorkOrder';

export default interface IUserWorkOrderRepository {
  findAll(): Promise<UserWorkOrder[]>;
  findOneById(id: number): Promise<UserWorkOrder>;
  countByUserId(userId: number): Promise<number>;
  findByUserId(userId: number, initialIndex: number, limit: number): Promise<UserWorkOrder[]>;
  findByWorkOrderId(workOrderId: number): Promise<UserWorkOrder[]>;
  persist(userWorkOrder: UserWorkOrder): Promise<UserWorkOrder>;
  destroy(userWorkOrder: UserWorkOrder): Promise<boolean>;
}

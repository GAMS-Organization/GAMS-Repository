import UserWorkOrder from '../Entities/UserWorkOrder';

export default interface IUserWorkOrderRepository {
  findAll(): Promise<UserWorkOrder[]>;
  findOneById(id: number): Promise<UserWorkOrder>;
  findByUserId(userId: number): Promise<UserWorkOrder[]>;
  findByWorkOrderId(workOrderId: number): Promise<UserWorkOrder[]>;
  persist(userWorkOrder: UserWorkOrder): Promise<UserWorkOrder>;
  destroy(userWorkOrder: UserWorkOrder): Promise<boolean>;
}

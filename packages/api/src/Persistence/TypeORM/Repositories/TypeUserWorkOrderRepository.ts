import IUserWorkOrderRepository from '../../../Domain/Interfaces/IUserWorkOrderRepository';
import UserWorkOrder from '../../../Domain/Entities/UserWorkOrder';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeUserWorkOrderRepository extends TypeRepository implements IUserWorkOrderRepository {
  public async findAll(): Promise<UserWorkOrder[]> {
    return await this.repository(UserWorkOrder).find();
  }

  public async findOneById(id: number): Promise<UserWorkOrder> {
    return await this.repository(UserWorkOrder).findOne(id);
  }

  public async findByUserId(id: number): Promise<UserWorkOrder[]> {
    return await this.repository(UserWorkOrder).find({ where: { user: id }, relations: ['user', 'workOrder'] });
  }

  public async findByWorkOrderId(id: number): Promise<UserWorkOrder[]> {
    return await this.repository(UserWorkOrder).find({ where: { workOrder: id }, relations: ['user', 'workOrder'] });
  }

  public async persist(workOrder: UserWorkOrder): Promise<UserWorkOrder> {
    return await this.repository(UserWorkOrder).save(workOrder);
  }

  public async destroy(workOrder: UserWorkOrder): Promise<boolean> {
    const result = await this.repository(UserWorkOrder).delete(workOrder.getId());

    return result && result.affected === 1;
  }
}

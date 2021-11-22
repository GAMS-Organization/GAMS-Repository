/* eslint-disable new-cap */
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import WorkOrder from './WorkOrder';

@Entity('user_work_order')
// eslint-disable-next-line require-jsdoc
export default class UserWorkOrder {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(_type => User, user => user.userWorkOrders)
  public user: User;
  @ManyToOne(_type => WorkOrder, workOrder => workOrder.userWorkOrders)
  public workOrder: WorkOrder;

  public constructor(user: User, workOrder: WorkOrder) {
    this.user = user;
    this.workOrder = workOrder;
  }

  public getId(): number {
    return this.id;
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(value: User): void {
    this.user = value;
  }

  public getWorkOrder(): WorkOrder {
    return this.workOrder;
  }

  public setWorkOrder(value: WorkOrder): void {
    this.workOrder = value;
  }
}

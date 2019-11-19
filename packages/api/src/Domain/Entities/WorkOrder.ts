/* eslint-disable new-cap */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Asset from './Asset';
import UserWorkOrder from './UserWorkOrder';

@Entity('work_order')
// eslint-disable-next-line require-jsdoc
export default class WorkOrder {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public orderDate: string;
  @Column()
  public startDate: string;
  @Column()
  public realizationDate: string;
  @Column()
  public priority: string;
  @Column()
  public state: string;
  @Column()
  public taskDespcription: string;
  @Column()
  public comment: string;
  @ManyToOne(_type => User, user => user.workOrders)
  public user: User;
  @ManyToOne(_type => Asset, asset => asset.workOrders)
  public asset: Asset;
  @OneToMany(_type => UserWorkOrder, userWorkOrders => userWorkOrders.workOrder)
  public userWorkOrders: UserWorkOrder[];

  public constructor(orderDate: string, taskDespcription: string, priority: string, asset: Asset, user: User) {
    this.orderDate = orderDate;
    this.taskDespcription = taskDespcription;
    this.priority = priority;
    this.asset = asset;
    this.user = user;
    //Hay que hacer los enums para los estados y otras cosas
    this.state = '';
  }

  public getId(): number {
    return this.id;
  }

  public getOrderDate(): string {
    return this.orderDate;
  }

  public getTaskDespcription(): string {
    return this.taskDespcription;
  }

  public getPriority(): string {
    return this.priority;
  }

  public getAsset(): Asset {
    return this.asset;
  }

  public getUser(): User {
    return this.user;
  }

  public getState(): string {
    return this.state;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public getRealizationDate(): string {
    return this.realizationDate;
  }

  public getComment(): string {
    return this.comment;
  }

  public getUserWorkOrders(): UserWorkOrder[] {
    return this.userWorkOrders;
  }

  public setOrderDate(orderDate: string): void {
    this.orderDate = orderDate;
  }

  public setTaskDespcription(taskDespcription: string): void {
    this.taskDespcription = taskDespcription;
  }

  public setPriority(priority: string): void {
    this.priority = priority;
  }

  public setAsset(asset: Asset): void {
    this.asset = asset;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public setState(state: string): void {
    this.state = state;
  }

  public setStartDate(startDate: string): void {
    this.startDate = startDate;
  }

  public setRealizationDate(realizationDate: string): void {
    this.realizationDate = realizationDate;
  }

  public setComment(comment: string): void {
    this.comment = comment;
  }

  public setUserWorkOrders(value: UserWorkOrder[]): void {
    this.userWorkOrders = value;
  }
}

// eslint-disable-next-line require-jsdoc
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Departure from './Departure';
import Product from './Product';
import WorkOrder from './WorkOrder';

@Entity('consumption')
// eslint-disable-next-line require-jsdoc
export default class Consumption {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public quantity: number;
  @ManyToOne(_type => Product, product => product.consumptions)
  public product: Product;
  @ManyToOne(_type => Departure, departure => departure.consumptions)
  public departure: Departure;
  @OneToOne(_type => WorkOrder)
  @JoinColumn()
  public workOrder: WorkOrder;

  // public constructor(quantity: number, product: Product, departure: Departure, workOrder: WorkOrder) {
  //   this.quantity = quantity;
  //   this.product = product;
  //   this.departure = departure;
  //   this.workOrder = workOrder;
  // }

  public constructor(quantity: number, product: Product, departure: Departure) {
    this.quantity = quantity;
    this.product = product;
    this.departure = departure;
  }

  public getId(): number {
    return this.id;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getDeparture(): Departure {
    return this.departure;
  }

  public getWorkOrder(): WorkOrder {
    return this.workOrder;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public setDeparture(departure: Departure): void {
    this.departure = departure;
  }

  public setWorkOrder(workOrder: WorkOrder): void {
    this.workOrder = workOrder;
  }
}

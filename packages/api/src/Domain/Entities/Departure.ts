// eslint-disable-next-line require-jsdoc
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import StockDeparture from './StockDeparture';
import Consumption from './Consumption';
import Product from './Product';
import WorkOrder from './WorkOrder';

@Entity('departure')
// eslint-disable-next-line require-jsdoc
export default class Departure {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public date: string;
  @Column()
  public observations: string;
  @OneToMany(_type => Consumption, consumption => consumption.departure)
  public consumptions: Consumption[];
  @OneToMany(_type => StockDeparture, stockDepartures => stockDepartures.departure)
  public stockDepartures: StockDeparture[];
  @OneToOne(_type => WorkOrder)
  @JoinColumn()
  public workOrder: WorkOrder;

  public constructor(date: string, observations: string) {
    this.date = date;
    this.observations = observations;
  }

  public getId(): number {
    return this.id;
  }

  public getDate(): string {
    return this.date;
  }

  public getObservations(): string {
    return this.observations;
  }

  public getWorkOrder(): WorkOrder {
    return this.workOrder;
  }

  public setDate(date: string): void {
    this.date = date;
  }

  public setObservations(observations: string): void {
    this.observations = observations;
  }

  public getConsumptions(): Consumption[] {
    return this.consumptions;
  }

  public getProductsFromConsumptions(consumptions: Consumption[]): Product[] {
    const products = [];
    for (const consumption of consumptions) {
      products.push(consumption.getProduct());
    }
    return products;
  }

  public setConsumptions(value: Consumption[]): void {
    this.consumptions = value;
  }

  public setWorkOrder(workOrder: WorkOrder): void {
    this.workOrder = workOrder;
  }
}

// eslint-disable-next-line require-jsdoc
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import StockDeparture from './StockDeparture';
import Consumption from './Consumption';
import Product from './Product';

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
}

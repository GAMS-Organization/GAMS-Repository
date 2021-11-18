/* eslint-disable new-cap */
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Departure from './Departure';
import Stock from './Stock';

@Entity('stock_departure')
// eslint-disable-next-line require-jsdoc
export default class StockDeparture {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(
    _type => Stock,
    stock => stock.stockDepartures,
  )
  public stock: Stock;
  @ManyToOne(
    _type => Departure,
    departure => departure.stockDepartures,
  )
  public departure: Departure;

  public constructor(stock: Stock, departure: Departure) {
    this.stock = stock;
    this.departure = departure;
  }

  public getId(): number {
    return this.id;
  }

  public getStock(): Stock {
    return this.stock;
  }

  public setStock(value: Stock): void {
    this.stock = value;
  }

  public getDeparture(): Departure {
    return this.departure;
  }

  public setDeparture(value: Departure): void {
    this.departure = value;
  }
}

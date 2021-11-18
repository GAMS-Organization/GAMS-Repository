// eslint-disable-next-line require-jsdoc
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Departure from './Departure';
import Product from './Product';

@Entity('consumption')
// eslint-disable-next-line require-jsdoc
export default class Consumption {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public quantity: number;
  @ManyToOne(
    _type => Product,
    product => product.consumptions,
  )
  public product: Product;
  @ManyToOne(
    _type => Departure,
    departure => departure.consumptions,
  )
  public departure: Departure;

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

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public setDeparture(departure: Departure): void {
    this.departure = departure;
  }
}

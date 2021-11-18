/* eslint-disable new-cap */
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Product from './Product';
import StockEntry from './StockEntry';
import StockDeparture from './StockDeparture';
import { StockStates } from '../Enums/StockStates';

@Entity('stock')
// eslint-disable-next-line require-jsdoc
export default class Stock {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public quantity: number;
  @Column()
  public minimunQuantity: number;
  @Column()
  public state: string;
  @OneToOne(_type => Product)
  @JoinColumn()
  public product: Product;
  @OneToMany(
    _type => StockEntry,
    stockEntries => stockEntries.stock,
  )
  public stockEntries: StockEntry[];
  @OneToMany(
    _type => StockDeparture,
    stockDepartures => stockDepartures.stock,
  )
  public stockDepartures: StockDeparture[];

  public constructor(product: Product, quantity: number, minimunQuantity: number = 0) {
    this.quantity = quantity;
    this.minimunQuantity = minimunQuantity;
    this.product = product;
    this.setState(quantity);
  }

  private setState(quantity = this.quantity, minimunQuantity = this.minimunQuantity) {
    let limit = minimunQuantity * 1.25;
    if (quantity <= limit) {
      if (quantity <= minimunQuantity) {
        this.state = StockStates.stock_insufficient;
      } else {
        this.state = StockStates.stock_critical;
      }
    } else {
      this.state = StockStates.stock_sufficient;
    }
  }

  public getId(): number {
    return this.id;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getMinimunQuantity(): number {
    return this.minimunQuantity;
  }

  public getState(): string {
    return this.state;
  }

  public getProduct(): Product {
    return this.product;
  }

  public setQuantity(quantity: number): void {
    this.setState(quantity);
    this.quantity = quantity;
  }

  public setMinimunQuantity(minimunQuantity: number): void {
    this.setState(this.quantity, minimunQuantity);
    this.minimunQuantity = minimunQuantity;
  }

  public getEntries(): StockEntry[] {
    return this.stockEntries;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }
}

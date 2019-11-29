// eslint-disable-next-line require-jsdoc
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Purchase from './Purchase';
import StockEntry from './StockEntry';

@Entity('entry')
// eslint-disable-next-line require-jsdoc
export default class Entry {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public date: string;
  @Column()
  public observations: string;
  @OneToMany(_type => Purchase, purchase => purchase.entry)
  public purchases: Purchase[];
  @OneToMany(_type => StockEntry, stockEntries => stockEntries.entry)
  public stockEntries: StockEntry[];

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

  public getPurchases(): Purchase[] {
    return this.purchases;
  }

  public setPurchases(value: Purchase[]): void {
    this.purchases = value;
  }

  public setStockEntries(value: StockEntry[]): void {
    this.stockEntries = value;
  }

  public getProductsFromPurchases(): string[] {
    const products = [];
    for (const purchase of this.purchases) {
      products.push(purchase.getProduct().getName());
    }
    return products;
  }

  public getStockEntries(): StockEntry[] {
    return this.stockEntries;
  }
}

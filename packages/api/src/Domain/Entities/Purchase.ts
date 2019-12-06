// eslint-disable-next-line require-jsdoc
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Entry from './Entry';
import Product from './Product';

@Entity('purchase')
// eslint-disable-next-line require-jsdoc
export default class Purchase {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public quantity: number;
  @Column()
  public provider: string;
  @ManyToOne(_type => Product, product => product.purchases)
  public product: Product;
  @ManyToOne(_type => Entry, entry => entry.purchases)
  public entry: Entry;

  public constructor(quantity: number, provider: string, product: Product, entry: Entry) {
    this.quantity = quantity;
    this.provider = provider;
    this.product = product;
    this.entry = entry;
  }

  public getId(): number {
    return this.id;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getProvider(): string {
    return this.provider;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getEntry(): Entry {
    return this.entry;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public setProvider(provider: string): void {
    this.provider = provider;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public setEntry(entry: Entry): void {
    this.entry = entry;
  }
}

/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Purchase from './Purchase';
import Consumption from './Consumption';

@Entity('product')
// eslint-disable-next-line require-jsdoc
export default class Product {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public name: string;
  @OneToMany(
    _type => Purchase,
    purchase => purchase.product,
  )
  public purchases: Purchase[];
  @OneToMany(
    _type => Consumption,
    consumption => consumption.product,
  )
  public consumptions: Consumption[];

  public constructor(name: string) {
    this.name = name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

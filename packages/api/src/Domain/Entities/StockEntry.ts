/* eslint-disable new-cap */
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Entry from './Entry';
import Stock from './Stock';

@Entity('stock_entry')
// eslint-disable-next-line require-jsdoc
export default class StockEntry {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(_type => Stock, stock => stock.stockEntries)
  public stock: Stock;
  @ManyToOne(_type => Entry, entry => entry.stockEntries)
  public entry: Entry;

  public constructor(stock: Stock, entry: Entry) {
    this.stock = stock;
    this.entry = entry;
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

  public getEntry(): Entry {
    return this.entry;
  }

  public setEntry(value: Entry): void {
    this.entry = value;
  }
}

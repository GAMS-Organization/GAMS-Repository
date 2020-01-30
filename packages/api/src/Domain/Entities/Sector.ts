/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Area from './Area';
import Asset from './Asset';

@Entity('sector')
// eslint-disable-next-line require-jsdoc
export default class Sector {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public name: string;
  @Column()
  public code: string;
  @OneToMany(_type => Area, area => area.sector)
  public areas: Area[];
  @OneToMany(_type => Asset, asset => asset.sector)
  public assets: Asset[];

  public constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setCode(code: string): void {
    this.code = code;
  }
}

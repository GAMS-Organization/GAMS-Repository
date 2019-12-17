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
  @OneToMany(_type => Area, area => area.sector)
  public areas: Area[];
  @OneToMany(_type => Asset, asset => asset.sector)
  public assets: Asset[];

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

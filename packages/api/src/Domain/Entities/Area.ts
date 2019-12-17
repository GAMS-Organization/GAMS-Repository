/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Service from './Service';
import Sector from './Sector';
import Asset from './Asset';

@Entity('area')
// eslint-disable-next-line require-jsdoc
export default class Area {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public name: string;
  @OneToMany(_type => Service, service => service.area)
  public services: Service[];
  @ManyToOne(_type => Sector, sector => sector.areas)
  public sector: Sector;
  @OneToMany(_type => Asset, asset => asset.area)
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

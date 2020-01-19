/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Sector from './Sector';
import Asset from './Asset';
import AreaService from './AreaService';

@Entity('area')
// eslint-disable-next-line require-jsdoc
export default class Area {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public name: string;
  @Column()
  public code: string;
  @ManyToOne(_type => Sector, sector => sector.areas)
  public sector: Sector;
  @OneToMany(_type => AreaService, areaServices => areaServices.area)
  public areaServices: AreaService[];
  @OneToMany(_type => Asset, asset => asset.area)
  public assets: Asset[];

  public constructor(name: string, code: string, sector: Sector) {
    this.name = name;
    this.sector = sector;
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

  public getSector(): Sector {
    return this.sector;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setCode(code: string): void {
    this.code = code;
  }
}

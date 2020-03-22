/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Element from './Element';
import Asset from './Asset';
import AreaService from './AreaService';

@Entity('service')
// eslint-disable-next-line require-jsdoc
export default class Service {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public name: string;
  @Column()
  public code: string;
  @OneToMany(_type => Element, element => element.service)
  public elements: Element[];
  @OneToMany(_type => AreaService, areaServices => areaServices.service)
  public areaServices: AreaService[];
  @OneToMany(_type => Asset, asset => asset.service)
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

  public getAreaService(): AreaService[] {
    return this.areaServices;
  }

  public getElements(): Element[] {
    return this.elements;
  }
}

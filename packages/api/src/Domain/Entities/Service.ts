/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Element from './Element';
import Area from './Area';
import Asset from './Asset';

@Entity('service')
// eslint-disable-next-line require-jsdoc
export default class Service {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public name: string;
  @OneToMany(_type => Element, element => element.service)
  public elements: Element[];
  @ManyToOne(_type => Area, area => area.services)
  public area: Area;
  @OneToMany(_type => Asset, asset => asset.service)
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

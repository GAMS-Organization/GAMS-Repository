/* eslint-disable new-cap */
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import WorkOrder from './WorkOrder';
import Service from './Service';
import Asset from './Asset';

@Entity('element')
// eslint-disable-next-line require-jsdoc
export default class Element {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public name: string;
  @ManyToOne(_type => Service, service => service.elements)
  public service: Service;
  @OneToMany(_type => Asset, asset => asset.element)
  public assets: Asset[];
  @OneToMany(_type => WorkOrder, workOrder => workOrder.asset)
  public workOrders: WorkOrder[];

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

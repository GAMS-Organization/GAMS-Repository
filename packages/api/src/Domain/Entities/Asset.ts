/* eslint-disable new-cap */
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import WorkOrder from './WorkOrder';
import Service from './Service';
import Sector from './Sector';
import Area from './Area';
import Element from './Element';

@Entity('asset')
// eslint-disable-next-line require-jsdoc
export default class Asset {
  @PrimaryGeneratedColumn()
  public id: string;
  @Column({ unique: true })
  public code: string;
  @Column({ nullable: true })
  public description: string;
  @ManyToOne(_type => Sector, sector => sector.assets)
  public sector: Sector;
  @ManyToOne(_type => Area, area => area.assets)
  public area: Area;
  @ManyToOne(_type => Service, service => service.assets)
  public service: Service;
  @ManyToOne(_type => Element, element => element.assets)
  public element: Element;
  @OneToMany(_type => WorkOrder, workOrder => workOrder.asset)
  public workOrders: WorkOrder[];

  public constructor(
    sector: Sector,
    area: Area,
    service: Service,
    element: Element,
    code: string,
    description: string,
  ) {
    this.sector = sector;
    this.area = area;
    this.service = service;
    this.element = element;
    this.code = code;
    this.description = description;
  }

  public getId(): string {
    return this.id;
  }

  public getCode(): string {
    return this.code;
  }

  public getDescription(): string {
    return this.description;
  }

  public getSector(): Sector {
    return this.sector;
  }

  public getArea(): Area {
    return this.area;
  }

  public getService(): Service {
    return this.service;
  }

  public getElement(): Element {
    return this.element;
  }

  public getWorkOrder(): WorkOrder[] {
    return this.workOrders;
  }

  public setCode(code: string): void {
    this.code = code;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setSector(sector: Sector): void {
    this.sector = sector;
  }

  public setArea(area: Area): void {
    this.area = area;
  }
  public setService(service: Service): void {
    this.service = service;
  }
  public setElement(element: Element): void {
    this.element = element;
  }

  public setWorkOrder(value: WorkOrder[]): void {
    this.workOrders = value;
  }
}

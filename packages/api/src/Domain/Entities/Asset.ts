/* eslint-disable new-cap */
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import WorkOrder from './WorkOrder';

@Entity('asset')
// eslint-disable-next-line require-jsdoc
export default class Asset {
  @PrimaryColumn()
  public id: string;
  @Column()
  public sector: string;
  @Column()
  public area: string;
  @Column()
  public servicio: string;
  @Column()
  public elemento: string;
  @OneToMany(_type => WorkOrder, workOrder => workOrder.asset)
  public workOrders: WorkOrder[];

  public constructor(sector: string, area: string, servicio: string, elemento: string) {
    this.sector = sector;
    this.area = area;
    this.servicio = servicio;
    this.elemento = elemento;

    //hay que generar el codigo unico para utilizar como id
    this.id = '';
  }

  public getId(): string {
    return this.id;
  }

  public getSector(): string {
    return this.sector;
  }

  public getArea(): string {
    return this.area;
  }

  public getServicio(): string {
    return this.servicio;
  }

  public getElemento(): string {
    return this.elemento;
  }

  public getWorkOrder(): WorkOrder[] {
    return this.workOrders;
  }

  public setSector(sector: string): void {
    this.sector = sector;
  }

  public setArea(area: string): void {
    this.area = area;
  }
  public setServicio(servicio: string): void {
    this.servicio = servicio;
  }
  public setElemento(elemento: string): void {
    this.elemento = elemento;
  }

  public setWorkOrder(value: WorkOrder[]): void {
    this.workOrders = value;
  }
}

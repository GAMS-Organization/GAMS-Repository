/* eslint-disable new-cap */
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Service from './Service';
import Area from './Area';

@Entity('area-service')
// eslint-disable-next-line require-jsdoc
export default class AreaService {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(_type => Area, area => area.areaServices)
  public area: Area;
  @ManyToOne(_type => Service, service => service.areaServices)
  public service: Service;

  public constructor(area: Area, service: Service) {
    this.area = area;
    this.service = service;
  }

  public getId(): number {
    return this.id;
  }

  public getArea(): Area {
    return this.area;
  }

  public setArea(value: Area): void {
    this.area = value;
  }

  public getService(): Service {
    return this.service;
  }

  public setService(value: Service): void {
    this.service = value;
  }
}

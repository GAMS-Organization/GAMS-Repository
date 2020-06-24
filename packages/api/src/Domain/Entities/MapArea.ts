/* eslint-disable new-cap */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Area from './Area';

@Entity('mapArea')
// eslint-disable-next-line require-jsdoc
export default class MapArea {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public service: string;
  @Column({ unique: true })
  public url: string;
  @ManyToOne(_type => Area, area => area.maps)
  public area: Area;

  public constructor(service: string, url: string, area: Area) {
    this.service = service;
    this.url = url;
    this.area = area;
  }

  public getId(): number {
    return this.id;
  }

  public getService(): string {
    return this.service;
  }

  public getUrl(): string {
    return this.url;
  }

  public getArea(): Area {
    return this.area;
  }

  public setService(service: string): void {
    this.service = service;
  }

  public setUrl(url: string): void {
    this.url = url;
  }
}

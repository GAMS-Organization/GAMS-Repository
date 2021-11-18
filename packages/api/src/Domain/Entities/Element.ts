/* eslint-disable new-cap */
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Service from './Service';
import Asset from './Asset';

@Entity('element')
// eslint-disable-next-line require-jsdoc
export default class Element {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public name: string;
  @Column({ unique: true })
  public code: string;
  @Column({ nullable: true })
  public steps: string;
  @ManyToOne(
    _type => Service,
    service => service.elements,
  )
  public service: Service;
  @OneToMany(
    _type => Asset,
    asset => asset.element,
  )
  public assets: Asset[];

  public constructor(name: string, code: string, service: Service, steps: string) {
    this.name = name;
    this.code = code;
    this.service = service;
    this.steps = steps;
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

  public getSteps(): string {
    return this.steps;
  }

  public getService(): Service {
    return this.service;
  }

  public getServiceName(): string {
    return this.service.getName();
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setSteps(steps: string): void {
    this.steps = steps;
  }
}

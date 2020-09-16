/* eslint-disable new-cap */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('event')
// eslint-disable-next-line require-jsdoc
export default class Product {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public title: string;
  @Column()
  public description: string;
  @Column()
  public startDate: string;
  @Column()
  public endDate: string;
  @Column()
  public allDay: boolean;
  @Column()
  public workers: number[];

  public constructor(title: string, description: string, startDate: string, endDate: string, allDay: boolean, workers: number[]) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.allDay = allDay;
    this.workers = workers;
  }

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public getEndDate(): string {
    return this.endDate;
  }

  public getAllDay(): boolean {
    return this.allDay;
  }

  public getWorkers(): number[] {
    return this.workers;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setStartDate(startDate: string): void {
    this.startDate = startDate;
  }

  public setEndDate(endDate: string): void {
    this.endDate = endDate;
  }

  public setAllDay(allDay: boolean): void {
    this.allDay = allDay;
  }

  public setWorkers(workers: number[]): void {
    this.workers = workers;
  }
}

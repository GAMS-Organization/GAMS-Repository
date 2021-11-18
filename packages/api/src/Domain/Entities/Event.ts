/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserEvent from './UserEvent';

@Entity('event')
// eslint-disable-next-line require-jsdoc
export default class Event {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public title: string;
  @Column()
  public description: string;
  @Column({ nullable: true })
  public startDate: string;
  @Column({ nullable: true })
  public endDate: string;
  @Column({ nullable: true })
  public allDay: boolean;
  @OneToMany(
    _type => UserEvent,
    userEvents => userEvents.event,
  )
  public userEvents: UserEvent[];

  public constructor(title: string, description: string, startDate: string, endDate: string, allDay: boolean) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.allDay = allDay;
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

  public getWorkers(): UserEvent[] {
    return this.userEvents;
  }

  public getWorkersId(): number[] {
    return this.userEvents.map(userEvent => {
      return userEvent.user.getId();
    });
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

  public setWorkers(userEvents: UserEvent[]): void {
    this.userEvents = userEvents;
  }
}

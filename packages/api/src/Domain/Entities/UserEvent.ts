/* eslint-disable new-cap */
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Event from './Event';

@Entity('user_event')
// eslint-disable-next-line require-jsdoc
export default class UserEvent {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(_type => User, user => user.userEvents)
  public user: User;
  @ManyToOne(_type => Event, event => event.userEvents)
  public event: Event;

  public constructor(user: User, event: Event) {
    this.user = user;
    this.event = event;
  }

  public getId(): number {
    return this.id;
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(value: User): void {
    this.user = value;
  }

  public getEvent(): Event {
    return this.event;
  }

  public setEvent(value: Event): void {
    this.event = value;
  }
}

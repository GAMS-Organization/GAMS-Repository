/* eslint-disable new-cap */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import EducationalElement from './EducationalElement';
import User from './User';

@Entity('element_request')
// eslint-disable-next-line require-jsdoc
export default class ElementRequest {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public status: string;
  @Column()
  public date: string;
  @ManyToOne(_type => EducationalElement, educationalElement => educationalElement.elementRequests)
  public element: EducationalElement;
  @ManyToOne(_type => User, user => user.elementRequests)
  public user: User;

  public constructor(element: EducationalElement, user: User, status: string, date: string) {
    this.element = element;
    this.status = status;
    this.user = user;
    this.date = date;
  }

  public getId(): number {
    return this.id;
  }

  public getElement(): EducationalElement {
    return this.element;
  }

  public getUser(): User {
    return this.user;
  }

  public getStatus(): string {
    return this.status;
  }

  public getDate(): string {
    return this.date;
  }

  public setStatus(status: string): void {
    this.status = status;
  }
}

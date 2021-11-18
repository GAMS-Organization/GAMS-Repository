/* eslint-disable new-cap */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import EducationalElement from './EducationalElement';
import User from './User';
import Area from './Area';

@Entity('element_request')
// eslint-disable-next-line require-jsdoc
export default class ElementRequest {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public status: string;
  @Column()
  public date: string;
  @Column()
  public quantity: number;
  @ManyToOne(
    _type => EducationalElement,
    educationalElement => educationalElement.elementRequests,
  )
  public element: EducationalElement;
  @ManyToOne(
    _type => User,
    user => user.elementRequests,
  )
  public user: User;
  @ManyToOne(
    _type => Area,
    area => area.elementRequests,
  )
  public area: Area;

  public constructor(
    element: EducationalElement,
    user: User,
    status: string,
    date: string,
    area: Area,
    quantity: number,
  ) {
    this.element = element;
    this.status = status;
    this.user = user;
    this.date = date;
    this.area = area;
    this.quantity = quantity;
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

  public getArea(): Area {
    return this.area;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getItemName(): string {
    return this.element.getName();
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public setArea(area: Area): void {
    this.area = area;
  }

  public setElement(element: EducationalElement): void {
    this.element = element;
  }
}

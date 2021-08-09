/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ElementRequest from './ElementRequest';

@Entity('educational_element')
// eslint-disable-next-line require-jsdoc
export default class EducationalElement {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @Column()
  public totalQuantity: number;
  @Column()
  public borrowQuantity: number;
  @OneToMany(_type => ElementRequest, elementRequest => elementRequest.element)
  public elementRequests: ElementRequest[];

  public constructor(name: string, totalQuantity: number, borrowQuantity: number) {
    this.name = name;
    this.totalQuantity = totalQuantity;
    this.borrowQuantity = borrowQuantity;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getTotalQuantity(): number {
    return this.totalQuantity;
  }

  public getBorrowQuantity(): number {
    return this.borrowQuantity;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setTotalQuantity(totalQuantity): void {
    this.totalQuantity = totalQuantity;
  }

  public setBorrowQuantity(borrowQuantity): void {
    this.borrowQuantity = borrowQuantity;
  }
}

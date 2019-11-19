/* eslint-disable new-cap */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Employment from './Employment';

@Entity('tasks')
// eslint-disable-next-line require-jsdoc
export default class Task {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public description: string;
  @ManyToOne(_type => Employment)
  public employment: Employment;

  public constructor(description: string) {
    this.description = description;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.description;
  }

  public setName(description: string): void {
    this.description = description;
  }
}

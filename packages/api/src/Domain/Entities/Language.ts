/* eslint-disable new-cap */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('languages')
// eslint-disable-next-line require-jsdoc
export default class Language {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

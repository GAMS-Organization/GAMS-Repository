/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Skill from './Skill';

@Entity('categories')
// eslint-disable-next-line require-jsdoc
export default class Category {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @OneToMany(_type => Skill, skill => skill.category)
  private skills: Skill[];

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

  public getSkills(): Skill[] {
    return this.skills;
  }

  public setSkills(value: Skill[]): void {
    this.skills = value;
  }
}

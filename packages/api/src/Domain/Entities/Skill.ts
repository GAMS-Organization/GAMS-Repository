/* eslint-disable new-cap */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import EmploymentSkills from './EmploymentSkill';
import ProfileSkills from './ProfileSkill';
import Category from './Category';

@Entity('skills')
// eslint-disable-next-line require-jsdoc
export default class Skill {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @Column()
  private priority: string;
  @ManyToOne(_type => Category)
  public category: Category;
  @Column()
  public startDate?: Date;
  @OneToMany(_type => ProfileSkills, profileSkills => profileSkills.rooftopperProfile)
  public profileSkills: ProfileSkills[];
  @OneToMany(_type => EmploymentSkills, employmentSkills => employmentSkills.skill)
  public employmentSkills: EmploymentSkills[];

  public constructor(name: string, priority: string, category: Category, startDate?: Date) {
    this.name = name;
    this.priority = priority;
    this.category = category;
    if (startDate) {
      this.startDate = startDate;
    }
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

  public getPriority(): string {
    return this.priority;
  }

  public setPriority(value: string): void {
    this.priority = value;
  }

  public getCategory(): Category {
    return this.category;
  }

  public setCategory(value: Category): void {
    this.category = value;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public setStartDate(value: Date): void {
    this.startDate = value;
  }

  public getProfileSkills(): ProfileSkills[] {
    return this.profileSkills;
  }

  public setProfileSkills(value: ProfileSkills[]): void {
    this.profileSkills = value;
  }

  public getEmploymentSkills(): EmploymentSkills[] {
    return this.employmentSkills;
  }

  public setEmploymentSkills(value: EmploymentSkills[]): void {
    this.employmentSkills = value;
  }
}

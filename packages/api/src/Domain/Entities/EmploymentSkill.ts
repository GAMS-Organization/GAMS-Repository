/* eslint-disable new-cap */
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Employment from './Employment';
import Skill from './Skill';

@Entity('employment_skills')
// eslint-disable-next-line require-jsdoc
export default class EmploymentSkills {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(_type => Employment)
  public employment: Employment;
  @ManyToOne(_type => Skill)
  public skill: Skill;

  public constructor(employment: Employment, skill: Skill) {
    this.employment = employment;
    this.skill = skill;
  }

  public getEmployment(): Employment {
    return this.employment;
  }

  public setEmployment(value: Employment): void {
    this.employment = value;
  }

  public getSkill(): Skill {
    return this.skill;
  }

  public setSkill(value: Skill): void {
    this.skill = value;
  }
}

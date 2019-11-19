/* eslint-disable new-cap */
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Skill from './Skill';
import RooftopperProfile from './RooftopperProfile';

@Entity('rooftopper_profile_skills')
// eslint-disable-next-line require-jsdoc
export default class ProfileSkills {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(_type => RooftopperProfile)
  public rooftopperProfile: RooftopperProfile;
  @ManyToOne(_type => Skill)
  public skill: Skill;

  public constructor(rooftopperProfile: RooftopperProfile, skill: Skill) {
    this.rooftopperProfile = rooftopperProfile;
    this.skill = skill;
  }

  public getProfile(): RooftopperProfile {
    return this.rooftopperProfile;
  }

  public setProfile(value: RooftopperProfile): void {
    this.rooftopperProfile = value;
  }

  public getSkill(): Skill {
    return this.skill;
  }

  public setSkill(value: Skill): void {
    this.skill = value;
  }
}

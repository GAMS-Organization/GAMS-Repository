/* eslint-disable new-cap */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import RooftopperProfile from './RooftopperProfile';

@Entity('educations')
// eslint-disable-next-line require-jsdoc
export default class Education {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public title: string;
  @Column()
  public grade: string;
  @Column()
  public institution: string;
  @Column()
  public startDate: Date;
  @Column({ nullable: true })
  public endDate?: Date;
  @ManyToOne(_type => RooftopperProfile, profile => profile.educations)
  public rooftopperProfile: RooftopperProfile;

  public constructor(title: string, grade: string, institution: string, startDate: Date, profile: RooftopperProfile) {
    this.title = title;
    this.grade = grade;
    this.institution = institution;
    this.startDate = startDate;
    this.rooftopperProfile = profile;
  }

  public getId(): number {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }

  public setTitle(value: string): void {
    this.title = value;
  }

  public getGrade(): string {
    return this.grade;
  }

  public setGrade(value: string): void {
    this.grade = value;
  }

  public getInstitution(): string {
    return this.institution;
  }

  public setInstitution(value: string): void {
    this.institution = value;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public setStartDate(value: Date): void {
    this.startDate = value;
  }

  public getEndDate(): Date {
    return this.endDate;
  }

  public setEndDate(value: Date) {
    this.endDate = value;
  }

  public getProfile(): RooftopperProfile {
    return this.rooftopperProfile;
  }

  public setProfile(value: RooftopperProfile): void {
    this.rooftopperProfile = value;
  }
}

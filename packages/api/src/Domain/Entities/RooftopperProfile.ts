/* eslint-disable new-cap */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Employment from './Employment';
import Education from './Education';
import ProfileSkills from './ProfileSkill';
import RooftopperLanguageLevel from './RooftopperLanguageLevel';
import { RooftopperStates } from '../Enums/RooftopperStates';

@Entity('rooftopper_profiles')
// eslint-disable-next-line require-jsdoc
export default class RooftopperProfile {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @Column()
  public surname: string;
  @Column()
  public profileImage: string;
  @Column({ unique: true })
  public slug: string;
  @Column()
  public registrationDate: Date;
  @Column()
  public isAvailable: boolean;
  @Column()
  public isWorkingOnAnotherProject: boolean;
  @Column()
  public workableTime: number;
  @Column()
  public oneLineDescription: string;
  @Column()
  public summaryDescription: string;
  @Column()
  public country: string;
  @Column()
  public city: string;
  @Column()
  public state: string;
  @Column({ default: RooftopperStates.rooftopper_active })
  public profileState: RooftopperStates;
  @OneToMany(_type => Employment, employment => employment.rooftopperProfile)
  public employments: Employment[];
  @OneToMany(_type => Education, education => education.rooftopperProfile)
  public educations: Education[];
  @OneToMany(_type => ProfileSkills, profileSkills => profileSkills.rooftopperProfile)
  public profileSkills: ProfileSkills[];
  @OneToMany(_type => RooftopperLanguageLevel, profileLanguageLevels => profileLanguageLevels.rooftopperProfile)
  public profileLanguageLevels: RooftopperLanguageLevel[];

  public constructor(
    name: string,
    surname: string,
    profileImage: string,
    slug: string,
    registrationDate: Date,
    isAvailable: boolean,
    isWorkingOnAnotherProject: boolean,
    workableTime: number,
    oneLineDescription: string,
    summaryDescription: string,
    country: string,
    city: string,
    state: string,
    profileState?: RooftopperStates,
  ) {
    this.name = name;
    this.surname = surname;
    this.profileImage = profileImage;
    this.slug = slug;
    this.registrationDate = registrationDate;
    this.isAvailable = isAvailable;
    this.isWorkingOnAnotherProject = isWorkingOnAnotherProject;
    this.workableTime = workableTime;
    this.oneLineDescription = oneLineDescription;
    this.summaryDescription = summaryDescription;
    this.country = country;
    this.city = city;
    this.state = state;
    if (profileState) {
      this.profileState = profileState;
    } else {
      this.profileState = RooftopperStates.rooftopper_active;
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

  public getSurname(): string {
    return this.surname;
  }

  public setSurname(surname: string): void {
    this.surname = surname;
  }

  public getProfileImage(): string {
    return this.profileImage;
  }

  public setProfileImage(value: string): void {
    this.profileImage = value;
  }

  public getSlug(): string {
    return this.slug;
  }

  public setSlug(value: string): void {
    this.slug = value;
  }

  public getRegistrationDate(): Date {
    return this.registrationDate;
  }

  public setRegistrationDate(value: Date): void {
    this.registrationDate = value;
  }

  public getIsAvailable(): boolean {
    return this.isAvailable;
  }

  public setIsAvailable(value: boolean): void {
    this.isAvailable = value;
  }

  public getIsWorkingOnAnotherProject(): boolean {
    return this.isWorkingOnAnotherProject;
  }

  public setIsWorkingOnAnotherProject(value: boolean): void {
    this.isWorkingOnAnotherProject = value;
  }

  public getWorkableTime(): number {
    return this.workableTime;
  }

  public setWorkableTime(value: number): void {
    this.workableTime = value;
  }

  public getOneLineDescription(): string {
    return this.oneLineDescription;
  }

  public setOneLineDescription(value: string) {
    this.oneLineDescription = value;
  }

  public getSummaryDescription(): string {
    return this.summaryDescription;
  }

  public setSummaryDescription(value: string) {
    this.summaryDescription = value;
  }

  public getCountry(): string {
    return this.country;
  }

  public setCountry(country: string): void {
    this.country = country;
  }

  public getCity(): string {
    return this.city;
  }

  public setCity(city: string): void {
    this.city = city;
  }

  public getState(): string {
    return this.state;
  }

  public setState(state: string): void {
    this.state = state;
  }

  public getProfileState(): RooftopperStates {
    return this.profileState;
  }

  public setProfileState(profileState: RooftopperStates): void {
    this.profileState = profileState;
  }

  public getEducations(): Education[] {
    return this.educations;
  }

  public setEducations(value: Education[]): void {
    this.educations = value;
  }

  public getEmployments(): Employment[] {
    return this.employments;
  }

  public setEmployments(value: Employment[]): void {
    this.employments = value;
  }

  public getProfileSkills(): ProfileSkills[] {
    return this.profileSkills;
  }

  public setProfileSkills(value: ProfileSkills[]): void {
    this.profileSkills = value;
  }

  public getProfileLanguageLevels(): RooftopperLanguageLevel[] {
    return this.profileLanguageLevels;
  }

  public setProfileLanguageLevels(value: RooftopperLanguageLevel[]): void {
    this.profileLanguageLevels = value;
  }
}

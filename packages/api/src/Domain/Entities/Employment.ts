/* eslint-disable new-cap */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Task from './Task';
import RooftopperProfile from './RooftopperProfile';

@Entity('employments')
// eslint-disable-next-line require-jsdoc
export default class Employment {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public post: string;
  @Column()
  public client: string;
  @Column()
  public under: number;
  @Column()
  public selectedProject: boolean;
  @Column()
  public startDate: Date;
  @Column()
  public endDate?: Date;
  @ManyToOne(_type => RooftopperProfile)
  public rooftopperProfile: RooftopperProfile;
  @OneToMany(_type => Task, task => task.employment)
  public tasks: Task[];

  public constructor(
    post: string,
    client: string,
    under: number,
    selectedProject: boolean,
    startDate: Date,
    endDate: Date,
    rooftopperProfile: RooftopperProfile,
  ) {
    this.post = post;
    this.client = client;
    this.under = under;
    this.selectedProject = selectedProject;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rooftopperProfile = rooftopperProfile;
  }

  public getId(): number {
    return this.id;
  }

  public getPost(): string {
    return this.post;
  }

  public setPost(value: string): void {
    this.post = value;
  }

  public getClient(): string {
    return this.client;
  }

  public setClient(value: string): void {
    this.client = value;
  }

  public getUnder(): number {
    return this.under;
  }

  public setUnder(value: number): void {
    this.under = value;
  }

  public getSelectedProject(): boolean {
    return this.selectedProject;
  }

  public setSelectedProject(value: boolean): void {
    this.selectedProject = value;
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

  public setEndDate(value: Date): void {
    this.endDate = value;
  }

  public getProfile(): RooftopperProfile {
    return this.rooftopperProfile;
  }

  public setProfile(value: RooftopperProfile): void {
    this.rooftopperProfile = value;
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public setTasks(tasksList: Task[]): void {
    this.tasks = tasksList;
  }
}

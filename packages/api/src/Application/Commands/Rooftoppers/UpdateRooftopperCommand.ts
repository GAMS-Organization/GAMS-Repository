export default class StoreRooftopperCommand {
  private id: number;
  private name: string;
  private surname: string;
  private profileImage: string;
  private registrationDate: Date;
  private isAvailable: boolean;
  private isWorkingOnAnotherProject: boolean;
  private workableTime: number;
  private slug: string;
  private oneLineDescription: string;
  private summaryDescription: string;
  private city: string;
  private state: string;
  private country: string;

  public constructor(
    id: number,
    name: string,
    surname: string,
    profileImage: string,
    registrationDate: Date,
    isAvailable: boolean,
    isWorkingOnAnotherProject: boolean,
    workableTime: number,
    slug: string,
    oneLineDescription: string,
    summaryDescription: string,
    city: string,
    state: string,
    country: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.profileImage = profileImage;
    this.registrationDate = registrationDate;
    this.isAvailable = isAvailable;
    this.isWorkingOnAnotherProject = isWorkingOnAnotherProject;
    this.workableTime = workableTime;
    this.slug = slug;
    this.oneLineDescription = oneLineDescription;
    this.summaryDescription = summaryDescription;
    this.city = city;
    this.state = state;
    this.country = country;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getSurname(): string {
    return this.surname;
  }

  public getProfileImage(): string {
    return this.profileImage;
  }

  public getRegistrationDate(): Date {
    return this.registrationDate;
  }

  public getIsAvailable(): boolean {
    return this.isAvailable;
  }

  public getIsWorkingOnAnotherProject(): boolean {
    return this.isWorkingOnAnotherProject;
  }

  public getSlug(): string {
    return this.slug;
  }

  public getOneLineDescription(): string {
    return this.oneLineDescription;
  }

  public getSummaryDescription(): string {
    return this.summaryDescription;
  }

  public getWorkableTime(): number {
    return this.workableTime;
  }

  public getCity(): string {
    return this.city;
  }

  public getState(): string {
    return this.state;
  }

  public getCountry(): string {
    return this.country;
  }
}

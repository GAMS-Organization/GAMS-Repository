export default class StoreEducationCommand {
  private title: string;
  private grade: string;
  private institution: string;
  private startDate: Date;
  private rooftopperProfileId: number;
  private endDate?: Date;

  public constructor(
    title: string,
    grade: string,
    institution: string,
    startDate: Date,
    rooftopperProfileId: number,
    endDate?: Date,
  ) {
    this.title = title;
    this.grade = grade;
    this.institution = institution;
    this.startDate = startDate;
    this.rooftopperProfileId = rooftopperProfileId;
    if (endDate) this.endDate = endDate;
  }

  public getTitle(): string {
    return this.title;
  }

  public getGrade(): string {
    return this.grade;
  }

  public getInstitution(): string {
    return this.institution;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date | null {
    return this.endDate;
  }

  public getRooftopperProfileId(): number {
    return this.rooftopperProfileId;
  }
}

export default class StoreElementRequestCommand {
  private educationalElementId: number;
  private userId: number;
  private date: string;

  public constructor(educationalElementId: number, userId: number, date: string) {
    this.educationalElementId = educationalElementId;
    this.userId = userId;
    this.date = date;
  }

  public getEducationalElementId(): number {
    return this.educationalElementId;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getDate(): string {
    return this.date;
  }
}

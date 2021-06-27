export default class StoreElementRequestCommand {
  private educationalElementId: number;
  private userId: number;
  private date: string;
  private areaId: number;
  private quantity: number;

  public constructor(educationalElementId: number, userId: number, date: string, areaId: number, quantity: number) {
    this.educationalElementId = educationalElementId;
    this.userId = userId;
    this.date = date;
    this.areaId = areaId;
    this.quantity = quantity;
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

  public getAreaId(): number {
    return this.areaId;
  }

  public getQuantity(): number {
    return this.quantity;
  }
}

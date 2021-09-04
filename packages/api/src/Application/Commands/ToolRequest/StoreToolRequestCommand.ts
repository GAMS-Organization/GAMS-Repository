export default class StoreToolRequestCommand {
  private toolId: number;
  private userId: number;
  private date: string;
  private areaId: number;
  private quantity: number;

  public constructor(toolId: number, userId: number, date: string, areaId: number, quantity: number) {
    this.toolId = toolId;
    this.userId = userId;
    this.date = date;
    this.areaId = areaId;
    this.quantity = quantity;
  }

  public getToolId(): number {
    return this.toolId;
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

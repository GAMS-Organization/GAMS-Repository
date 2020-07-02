export default class StoreWorkOrderCommand {
  private orderDate: string;
  private priority: string;
  private comment: string;
  private assetId: number;
  private userId: number;

  public constructor(orderDate: string, priority: string, comment: string, assetId: number, userId: number) {
    this.orderDate = orderDate;
    this.priority = priority;
    this.comment = comment;
    this.assetId = assetId;
    this.userId = userId;
  }

  public getOrderDate(): string {
    return this.orderDate;
  }

  public getpriority(): string {
    return this.priority;
  }

  public getComment(): string {
    return this.comment;
  }

  public getAssetId(): number {
    return this.assetId;
  }

  public getUserId(): number {
    return this.userId;
  }
}

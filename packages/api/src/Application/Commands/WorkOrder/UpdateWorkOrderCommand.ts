export default class UpdateWorkOrderCommand {
  private id: number;
  private orderDate: string;
  private startDate: string;
  private realizationDate: string;
  private priority: string;
  private state: string;
  private comment: string;
  private taskDescription: string;
  private assetId: number;
  private userId: number;
  private workersId: number[];

  public constructor(
    id: number,
    orderDate: string,
    startDate: string,
    realizationDate: string,
    priority: string,
    state: string,
    comment: string,
    taskDescription: string,
    assetId: number,
    userId: number,
    workersId: number[],
  ) {
    this.id = id;
    this.orderDate = orderDate;
    this.startDate = startDate;
    this.realizationDate = realizationDate;
    this.priority = priority;
    this.state = state;
    this.comment = comment;
    this.taskDescription = taskDescription;
    this.assetId = assetId;
    this.userId = userId;
    this.workersId = workersId;
  }

  public getId(): number {
    return this.id;
  }

  public getOrderDate(): string {
    return this.orderDate;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public getRealizationDate(): string {
    return this.realizationDate;
  }

  public getPriority(): string {
    return this.priority;
  }

  public getState(): string {
    return this.state;
  }

  public getComment(): string {
    return this.comment;
  }

  public getTaskDescription(): string {
    return this.taskDescription;
  }

  public getAssetId(): number {
    return this.assetId;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getWorkersId(): number[] {
    return this.workersId;
  }
}

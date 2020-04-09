export default class TakeWorkOrderCommand {
  private id: number;
  private startDate: string;
  private state: string;
  private workerId: number;

  public constructor(
    id: number,
    startDate: string,
    state: string,
    workerId: number,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.state = state;
    this.workerId = workerId;
  }

  public getId(): number {
    return this.id;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public getState(): string {
    return this.state;
  }

  public getWorkerId(): number{
    return this.workerId;
  }
}

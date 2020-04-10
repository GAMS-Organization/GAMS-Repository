export default class TakeWorkOrderCommand {
  private id: number;
  private startDate: string;
  private workerId: number;

  public constructor(id: number, startDate: string, workerId: number) {
    this.id = id;
    this.startDate = startDate;
    this.workerId = workerId;
  }

  public getId(): number {
    return this.id;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public getWorkerId(): number {
    return this.workerId;
  }
}

export default class AssignWorkOrderCommand {
  private id: number;
  private startDate: string;
  private workersId: number[];

  public constructor(id: number, startDate: string, workersId: number[]) {
    this.id = id;
    this.startDate = startDate;
    this.workersId = workersId;
  }

  public getId(): number {
    return this.id;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public getWorkersId(): number[] {
    return this.workersId;
  }
}

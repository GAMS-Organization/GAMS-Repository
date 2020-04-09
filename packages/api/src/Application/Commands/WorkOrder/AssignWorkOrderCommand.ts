export default class AssignWorkOrderCommand {
  private id: number;
  private startDate: string;
  private state: string;
  private workersId: number[];

  public constructor(
    id: number,
    startDate: string,
    state: string,
    workersId: number[],
  ) {
    this.id = id;
    this.startDate = startDate;
    this.state = state;
    this.workersId = workersId;
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

  public getWorkersId(): number[] {
    return this.workersId;
  }
}

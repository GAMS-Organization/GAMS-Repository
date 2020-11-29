export default class StoreEventCommand {
  private id: number;
  private title: string;
  private description: string;
  private startDate: string;
  private endDate: string;
  private allDay: boolean;
  private workersId: number[];

  public constructor(
    id: number,
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    allDay: boolean,
    workersId: number[],
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.allDay = allDay;
    this.workersId = workersId;
  }

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStartDate(): string {
    return this.startDate;
  }

  public getEndDate(): string {
    return this.endDate;
  }

  public getAllDay(): boolean {
    return this.allDay;
  }

  public getWorkersId(): number[] {
    return this.workersId;
  }
}

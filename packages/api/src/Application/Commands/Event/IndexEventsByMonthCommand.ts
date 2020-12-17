export default class IndexEventsByMonthCommand {
  private month: number;

  public constructor(month: number) {
    this.month = month;
  }

  public getMonth(): number {
    return this.month;
  }
}

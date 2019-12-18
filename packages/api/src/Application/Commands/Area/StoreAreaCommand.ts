export default class StoreAreaCommand {
  private name: string;
  private sector: string;

  public constructor(name: string, sector: string) {
    this.name = name;
    this.sector = sector;
  }

  public getName(): string {
    return this.name;
  }

  public getSector(): string {
    return this.sector;
  }
}

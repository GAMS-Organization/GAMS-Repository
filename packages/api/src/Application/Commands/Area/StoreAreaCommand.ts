export default class StoreAreaCommand {
  private name: string;
  private code: string;
  private sector: string;

  public constructor(name: string, code: string, sector: string) {
    this.name = name;
    this.code = code;
    this.sector = sector;
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }

  public getSector(): string {
    return this.sector;
  }
}

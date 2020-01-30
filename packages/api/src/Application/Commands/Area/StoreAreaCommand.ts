export default class StoreAreaCommand {
  private name: string;
  private code: string;
  private sector: string;
  private services: string[];

  public constructor(name: string, code: string, sector: string, services: string[]) {
    this.name = name;
    this.code = code;
    this.sector = sector;
    this.services = services;
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

  public getServices(): string[]{
    return this.services;
  }
}

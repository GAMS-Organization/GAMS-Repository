export default class StoreServiceCommand {
  private name: string;
  private code: string;
  private area: string;

  public constructor(name: string, code: string, area: string) {
    this.name = name;
    this.code = code;
    this.area = area;
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }

  public getArea(): string {
    return this.area;
  }
}

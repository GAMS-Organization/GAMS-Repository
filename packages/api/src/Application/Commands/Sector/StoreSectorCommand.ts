export default class StoreSectorCommand {
  private name: string;
  private code: string;

  public constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }
}

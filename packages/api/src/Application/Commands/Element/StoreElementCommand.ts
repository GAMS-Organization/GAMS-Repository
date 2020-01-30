export default class StoreElementCommand {
  private name: string;
  private code: string;
  private service: string;
  private description: string;

  public constructor(name: string, code: string, service: string, description: string) {
    this.name = name;
    this.code = code;
    this.service = service;
    this.description = description;
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }

  public getDescription(): string{
    return this.description;
  }

  public getService(): string {
    return this.service;
  }
}

export default class StoreElementCommand {
  private name: string;
  private code: string;
  private service: string;
  private steps: string;

  public constructor(name: string, code: string, service: string, steps: string) {
    this.name = name;
    this.code = code;
    this.service = service;
    this.steps = steps;
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }

  public getService(): string {
    return this.service;
  }

  public getSteps(): string {
    return this.steps;
  }
}

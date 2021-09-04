export default class UpdateElementCommand {
  private id: number;
  private name: string;
  private steps: string;

  public constructor(id: number, name: string, steps: string) {
    this.id = id;
    this.name = name;
    this.steps = steps;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getSteps(): string {
    return this.steps;
  }
}

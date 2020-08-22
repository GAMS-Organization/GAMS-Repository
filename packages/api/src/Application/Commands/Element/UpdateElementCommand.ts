export default class UpdateElementCommand {
  private id: number;
  private name: string;
  private description: string;
  private steps: string;

  public constructor(id: number, name: string,  description: string, steps: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.steps = steps;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getSteps(): string {
    return this.steps;
  }
}

export default class UpdateAreaCommand {
  private id: number;
  private name: string;
  private services: string[];
  private maps: object[];

  public constructor(id: number, name: string, services: string[], maps: object[]) {
    this.id = id;
    this.name = name;
    this.services = services;
    this.maps = maps;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getServices(): string[] {
    return this.services;
  }

  public getMaps(): object[] {
    return this.maps;
  }
}

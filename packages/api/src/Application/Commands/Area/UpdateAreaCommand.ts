import { IMap } from '../../../utils/customInterfaces';

export default class UpdateAreaCommand {
  private id: number;
  private name: string;
  private services: string[];
  private maps: IMap[];

  public constructor(id: number, name: string, services: string[], maps: IMap[]) {
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

  public getMaps(): IMap[] {
    return this.maps;
  }
}

export default class UpdateSectorCommand {
  private id: number;
  private map: string;

  public constructor(id: number, map: string) {
    this.id = id;
    this.map = map;
  }

  public getId(): number {
    return this.id;
  }

  public getMap(): string {
    return this.map;
  }
}

export default class ShowElementsByAreaCommand {
  private areaId: number;

  public constructor(areaId: number) {
    this.areaId = areaId;
  }

  public getAreaId(): number {
    return this.areaId;
  }
}

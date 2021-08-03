export default class StoreAssetCommand {
  private area: string;
  private description: string;
  private element: string;
  private sector: string;
  private service: string;

  public constructor(sector: string, description: string, area: string, service: string, element: string) {
    this.area = area;
    this.description = description;
    this.element = element;
    this.sector = sector;
    this.service = service;
  }

  public getArea(): string {
    return this.area;
  }

  public getDescription(): string {
    return this.description;
  }

  public getElement(): string {
    return this.element;
  }

  public getSector(): string {
    return this.sector;
  }

  public getService(): string {
    return this.service;
  }
}

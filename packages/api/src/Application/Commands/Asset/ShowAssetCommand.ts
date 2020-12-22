export default class ShowAssetCommand {
  private sectorId: number;
  private areaId: number;
  private serviceId: number;
  private elementId: number;

  public constructor(sectorId: number, areaId: number, serviceId: number, elementId: number) {
    this.sectorId = sectorId;
    this.areaId = areaId;
    this.serviceId = serviceId;
    this.elementId = elementId;
  }

  public getSectorId(): number {
    return this.sectorId;
  }
  public getAreaId(): number {
    return this.areaId;
  }
  public getServiceId(): number {
    return this.serviceId;
  }
  public getElementId(): number {
    return this.elementId;
  }
  public setSectorId(sectorId: number): void {
    this.sectorId = sectorId;
  }
  public setAreaId(areaId: number): void {
    this.areaId = areaId;
  }
  public setServiceId(serviceId: number): void {
    this.serviceId = serviceId;
  }
  public setElementId(elementId: number): void {
    this.elementId = elementId;
  }
}

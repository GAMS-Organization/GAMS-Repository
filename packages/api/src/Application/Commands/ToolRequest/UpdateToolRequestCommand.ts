export default class UpdateToolRequestCommand {
  private id: number;
  private educationalElementId: number;
  private status: string;
  private areaId: number;

  public constructor(id: number, educationalElementId: number, status: string, areaId: number) {
    this.id = id;
    this.educationalElementId = educationalElementId;
    this.status = status;
    this.areaId = areaId;
  }

  public getId(): number {
    return this.id;
  }

  public getEducationalElementId(): number {
    return this.educationalElementId;
  }

  public getStatus(): string {
    return this.status;
  }

  public getAreaId(): number {
    return this.areaId;
  }
}

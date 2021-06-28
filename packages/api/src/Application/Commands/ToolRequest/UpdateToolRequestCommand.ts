export default class UpdateToolRequestCommand {
  private id: number;
  private toolId: number;
  private status: string;
  private areaId: number;

  public constructor(id: number, toolId: number, status: string, areaId: number) {
    this.id = id;
    this.toolId = toolId;
    this.status = status;
    this.areaId = areaId;
  }

  public getId(): number {
    return this.id;
  }

  public getToolId(): number {
    return this.toolId;
  }

  public getStatus(): string {
    return this.status;
  }

  public getAreaId(): number {
    return this.areaId;
  }
}

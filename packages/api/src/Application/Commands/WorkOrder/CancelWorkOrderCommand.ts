export default class CancelWorkOrderCommand {
  private id: number;
  private taskDescription: string;
  private userId: number;

  public constructor(id: number, taskDescription: string, userId: number) {
    this.id = id;
    this.taskDescription = taskDescription;
    this.userId = userId;
  }

  public getId(): number {
    return this.id;
  }

  public getTaskDescription(): string {
    return this.taskDescription;
  }

  public getUserId(): number {
    return this.userId;
  }
}

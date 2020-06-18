export default class CompleteWorkOrderCommand {
  private id: number;
  private realizationDate: string;
  private taskDescription: string;
  private productsId: number[];
  private quantities: number[];

  public constructor(
    id: number,
    realizationDate: string,
    taskDescription: string,
    productsId: number[],
    quantities: number[],
  ) {
    this.id = id;
    this.realizationDate = realizationDate;
    this.taskDescription = taskDescription;
    this.productsId = productsId;
    this.quantities = quantities;
  }

  public getId(): number {
    return this.id;
  }

  public getRealizationDate(): string {
    return this.realizationDate;
  }

  public getTaskDescription(): string {
    return this.taskDescription;
  }

  public getProductsId(): number[] {
    return this.productsId;
  }

  public getQuantities(): number[] {
    return this.quantities;
  }
}

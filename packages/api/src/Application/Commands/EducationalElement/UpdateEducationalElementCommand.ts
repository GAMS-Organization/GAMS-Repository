export default class UpdateEducationalElementCommand {
  private id: number;
  private name: string;
  private totalQuantity: number;
  private borrowQuantity: number;

  public constructor(id: number, name: string, totalQuantity: number, borrowQuantity: number) {
    this.id = id;
    this.name = name;
    this.totalQuantity = totalQuantity;
    this.borrowQuantity = borrowQuantity;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getTotalQuantity(): number {
    return this.totalQuantity;
  }

  public getBorrowQuantity(): number {
    return this.borrowQuantity;
  }
}

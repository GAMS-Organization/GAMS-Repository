export default class StoreEducationalElementCommand {
  private name: string;
  private totalQuantity: number;
  private borrowQuantity: number;

  public constructor(name: string, totalQuantity: number, borrowQuantity: number) {
    this.name = name;
    this.totalQuantity = totalQuantity;
    this.borrowQuantity = borrowQuantity;
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

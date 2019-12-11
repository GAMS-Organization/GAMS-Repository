
export default class UpdateStockCommand {
  private id: number;
  private quantity: number;
  private minimunQuantity: number;

  public constructor(id: number, quantity: number, minimunQuantity: number) {
    this.id = id;
    this.quantity = quantity;
    this.minimunQuantity = minimunQuantity;
  }

  public getId(): number{
    return this.id;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getMinimunQuantity(): number {
    return this.minimunQuantity;
  }

}

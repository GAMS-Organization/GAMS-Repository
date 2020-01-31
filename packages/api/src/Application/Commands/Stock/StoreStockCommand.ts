import Product from '../../../Domain/Entities/Product';

export default class StoreStockCommand {
  private product: Product;
  private quantity: number;
  private minimunQuantity: number;

  public constructor(product: Product, quantity: number, minimunQuantity: number) {
    this.product = product;
    this.quantity = quantity;
    this.minimunQuantity = minimunQuantity;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getMinimunQuantity(): number {
    return this.minimunQuantity;
  }
}

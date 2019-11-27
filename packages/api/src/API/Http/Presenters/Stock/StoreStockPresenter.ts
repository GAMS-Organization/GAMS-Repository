import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Stock from '../../../../Domain/Entities/Stock';

export default class StoreStockPresenter implements IPresenter {
  private result: Stock;

  public constructor(result: Stock) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      product: this.result.getProduct(),
      quantity: this.result.getQuantity(),
      minimunQuantity: this.result.getMinimunQuantity(),
      state: this.result.getState(),
      entries: this.result.getEntriesFromStockEntry(),
    };
  }
}

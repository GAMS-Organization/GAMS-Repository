import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Stock from '../../../../Domain/Entities/Stock';

export default class GetAllUsersPresenter implements IPresenter {
  private result: any;

  public constructor(result: Stock[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const stockResult: any[] = [];

    this.result.forEach((stock: Stock): void => {
      stockResult.push({
        id: stock.getId(),
        product: stock.getProduct().getName(),
        quantity: stock.getQuantity(),
        minimunQuantity: stock.getMinimunQuantity(),
        state: stock.getState(),
      });
    });

    return stockResult;
  }
}

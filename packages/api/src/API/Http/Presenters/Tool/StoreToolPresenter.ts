import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Tool from '../../../../Domain/Entities/Tool';

export default class StoreToolPresenter implements IPresenter {
  private result: Tool;

  public constructor(result: Tool) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      name: this.result.getName(),
      totalQuantity: this.result.getTotalQuantity(),
      borrowQuantity: this.result.getBorrowQuantity(),
    };
  }
}

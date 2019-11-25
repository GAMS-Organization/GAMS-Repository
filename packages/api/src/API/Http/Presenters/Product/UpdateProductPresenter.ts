import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Product from '../../../../Domain/Entities/Product';

export default class UpdateProductPresenter implements IPresenter {
  private result: Product;

  public constructor(result: Product) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      name: this.result.getName(),
    };
  }
}

import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Product from '../../../../Domain/Entities/Product';

export default class GetAllProductsPresenter implements IPresenter {
  private result: any;

  public constructor(result: Product[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const productResult: any[] = [];

    this.result.forEach((product: Product): void => {
      productResult.push({
        id: product.getId(),
        name: product.getName(),
      });
    });

    return productResult;
  }
}

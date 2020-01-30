import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Asset from '../../../../Domain/Entities/Asset';

export default class StoreAssetPresenter implements IPresenter {
  private result: Asset;

  public constructor(result: Asset) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      code: this.result.getCode(),
      sector: this.result.getSector(),
      area: this.result.getArea(),
      service: this.result.getService(),
      element: this.result.getElement(),
    };
  }
}

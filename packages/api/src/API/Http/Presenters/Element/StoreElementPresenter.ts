import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Element from '../../../../Domain/Entities/Element';

export default class StoreElementPresenter implements IPresenter {
  private result: Element;

  public constructor(result: Element) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      name: this.result.getName(),
      code: this.result.getCode(),
      service: this.result.getService(),
    };
  }
}

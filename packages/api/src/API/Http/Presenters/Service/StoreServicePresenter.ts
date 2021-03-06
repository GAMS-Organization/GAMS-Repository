import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Service from '../../../../Domain/Entities/Service';

export default class StoreServicePresenter implements IPresenter {
  private result: Service;

  public constructor(result: Service) {
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
      area: this.result.getAreaService(),
    };
  }
}

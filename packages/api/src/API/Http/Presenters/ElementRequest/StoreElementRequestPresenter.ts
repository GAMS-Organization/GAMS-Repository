import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import ElementRequest from '../../../../Domain/Entities/ElementRequest';

export default class StoreElementRequestPresenter implements IPresenter {
  private result: ElementRequest;

  public constructor(result: ElementRequest) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      educationalElement: this.result.getElement(),
      user: this.result.getUser(),
      date: this.result.getDate(),
    };
  }
}

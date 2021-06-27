import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import ElementRequest from '../../../../Domain/Entities/ElementRequest';

export default class UpdateElementRequestPresenter implements IPresenter {
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
      user: {
        name: this.result.getUser().getName(),
        surname: this.result.getUser().getSurname(),
        id: this.result.getUser().getId(),
      },
      date: this.result.getDate(),
      area: {
        name: this.result.getArea().getName(),
        id: this.result.getArea().getId(),
        code: this.result.getArea().getCode(),
      },
      status: this.result.getStatus(),
      quantity: this.result.getQuantity(),
    };
  }
}

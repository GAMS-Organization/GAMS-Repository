import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import ElementRequest from '../../../../Domain/Entities/ElementRequest';

export default class GetAllElementRequestPresenter implements IPresenter {
  private result: any;

  public constructor(result: ElementRequest[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const elementRequestResult: any[] = [];

    this.result.forEach((elementRequest: ElementRequest): void => {
      elementRequestResult.push({
        id: elementRequest.getId(),
        educationalElement: elementRequest.getElement(),
        user: {
          name: elementRequest.getUser().getName(),
          surname: elementRequest.getUser().getSurname(),
          id: elementRequest.getUser().getId(),
        },
        date: elementRequest.getDate(),
        area: {
          name: elementRequest.getArea().getName(),
          id: elementRequest.getArea().getId(),
          code: elementRequest.getArea().getCode(),
        },
        status: elementRequest.getStatus(),
        quantity: elementRequest.getQuantity(),
      });
    });

    return elementRequestResult;
  }
}

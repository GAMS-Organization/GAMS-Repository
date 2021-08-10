import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Element from '../../../../Domain/Entities/Element';

export default class GetAllElementsPresenter implements IPresenter {
  private result: any;

  public constructor(result: Element[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const elementResult: any[] = [];

    this.result.forEach((element: Element): void => {
      elementResult.push({
        id: element.getId(),
        name: element.getName(),
        code: element.getCode(),
        service: element.getService(),
      });
    });

    return elementResult;
  }
}

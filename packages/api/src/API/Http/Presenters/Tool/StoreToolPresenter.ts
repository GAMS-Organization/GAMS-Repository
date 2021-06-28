import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import EducationalElement from '../../../../Domain/Entities/EducationalElement';

export default class StoreToolPresenter implements IPresenter {
  private result: EducationalElement;

  public constructor(result: EducationalElement) {
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

import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import EducationalElement from '../../../../Domain/Entities/EducationalElement';

export default class GetAllToolPresenter implements IPresenter {
  private result: any;

  public constructor(result: EducationalElement[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const educationalElementResult: any[] = [];

    this.result.forEach((educationalElement: EducationalElement): void => {
      educationalElementResult.push({
        id: educationalElement.getId(),
        name: educationalElement.getName(),
        totalQuantity: educationalElement.getTotalQuantity(),
        borrowQuantity: educationalElement.getBorrowQuantity(),
      });
    });

    return educationalElementResult;
  }
}

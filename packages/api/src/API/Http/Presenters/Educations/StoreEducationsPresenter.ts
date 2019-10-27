import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Education from '../../../../Domain/Entities/Education';

export default class StoreEducationsPresenter implements IPresenter {
  private result: Education;

  public constructor(result: Education) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      title: this.result.getTitle(),
      grade: this.result.getGrade(),
      institution: this.result.getInstitution(),
      startDate: this.result.getStartDate(),
      endDate: this.result.getEndDate(),
      rooftopperProfile: {
        id: this.result.getProfile().getId(),
      },
    };
  }
}

import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Education from '../../../../Domain/Entities/Education';

export default class GetAllEducationsPresenter implements IPresenter {
  private result: any;

  public constructor(result: Education[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const educationsResult: any[] = [];

    this.result.forEach((education: Education): void => {
      educationsResult.push({
        id: education.getId(),
        title: education.getTitle(),
        grade: education.getGrade(),
        institution: education.getInstitution(),
        startDate: education.getStartDate(),
        endDate: education.getEndDate(),
        rooftopperProfile: {
          id: education.getProfile().getId(),
          name: education.getProfile().getName(),
        },
      });
    });

    return educationsResult;
  }
}

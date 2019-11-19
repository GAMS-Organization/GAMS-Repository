import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import RooftopperProfile from '../../../../Domain/Entities/RooftopperProfile';

export default class StoreRooftopperPresenter implements IPresenter {
  private result: RooftopperProfile;

  public constructor(result: RooftopperProfile) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      name: this.result.getName(),
      surname: this.result.getSurname(),
      profileImage: this.result.getProfileImage(),
      slug: this.result.getSlug(),
      registrationDate: this.result.getRegistrationDate(),
      isAvailable: this.result.getIsAvailable(),
      isWorkingOnAnotherProject: this.result.getIsWorkingOnAnotherProject(),
      workableTime: this.result.getWorkableTime(),
      oneLineDescription: this.result.getOneLineDescription(),
      summaryDescription: this.result.getSummaryDescription(),
      country: this.result.getCountry(),
      city: this.result.getCity(),
      state: this.result.getState(),
      profileState: this.result.getProfileState(),
    };
  }
}

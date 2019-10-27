import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import RooftopperProfile from '../../../../Domain/Entities/RooftopperProfile';

export default class GetAllRooftoppersPresenter implements IPresenter {
  private result: any;

  public constructor(result: RooftopperProfile[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const rooftopperProfilesResult: any[] = [];

    this.result.forEach((rooftopperProfile: RooftopperProfile): void => {
      rooftopperProfilesResult.push({
        id: rooftopperProfile.getId(),
        name: rooftopperProfile.getName(),
        surname: rooftopperProfile.getSurname(),
        profileImage: rooftopperProfile.getProfileImage(),
        slug: rooftopperProfile.getSlug(),
        registrationDate: rooftopperProfile.getRegistrationDate(),
        isAvailable: rooftopperProfile.getIsAvailable(),
        isWorkingOnAnotherProject: rooftopperProfile.getIsWorkingOnAnotherProject(),
        workableTime: rooftopperProfile.getWorkableTime(),
        oneLineDescription: rooftopperProfile.getOneLineDescription(),
        summaryDescription: rooftopperProfile.getSummaryDescription(),
        country: rooftopperProfile.getCountry(),
        city: rooftopperProfile.getCity(),
        state: rooftopperProfile.getState(),
        profileState: rooftopperProfile.getProfileState(),
      });
    });

    return rooftopperProfilesResult;
  }
}

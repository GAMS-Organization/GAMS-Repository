import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import User from '../../../../Domain/Entities/User';

export default class GetAllUsersPresenter implements IPresenter {
  private result: any;

  public constructor(result: User[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const userResult: any[] = [];

    this.result.forEach((user: User): void => {
      userResult.push({
        id: user.getId(),
        name: user.getName(),
        surname: user.getSurname(),
        email: user.getEmail(),
        state: user.getUserState(),
        roles: user.getRolesFromUserRole(),
      });
    });

    return userResult;
  }
}

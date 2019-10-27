import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import User from '../../../../Domain/Entities/User';

export default class GetUserPresenter implements IPresenter {
  private result: User;

  public constructor(result: User) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      username: this.result.getUsername(),
      name: this.result.getName(),
      surname: this.result.getSurname(),
      email: this.result.getEmail(),
      state: this.result.getUserState(),
      roles: this.result.getRolesFromUserRole(),
    };
  }
}

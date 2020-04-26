import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Sector from '../../../../Domain/Entities/Sector';

export default class UpdateSectorPresenter implements IPresenter {
  private result: Sector;

  public constructor(result: Sector) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      name: this.result.getName(),
      map: this.result.getMap(),
    };
  }
}

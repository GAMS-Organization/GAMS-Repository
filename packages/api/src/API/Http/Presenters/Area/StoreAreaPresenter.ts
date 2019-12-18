import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Area from '../../../../Domain/Entities/Area';

export default class StoreAreaPresenter implements IPresenter {
  private result: Area;

  public constructor(result: Area) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      name: this.result.getName(),
      sector: this.result.getSector(),
    };
  }
}

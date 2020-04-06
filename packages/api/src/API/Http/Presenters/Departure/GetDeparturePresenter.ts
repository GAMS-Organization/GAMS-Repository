import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Departure from '../../../../Domain/Entities/Departure';

export default class GetDeparturePresenter implements IPresenter {
  private result: Departure;

  public constructor(result: Departure) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      date: this.result.getDate(),
      observations: this.result.getObservations(),
      consumptions: this.result.getConsumptions(),
    };
  }
}

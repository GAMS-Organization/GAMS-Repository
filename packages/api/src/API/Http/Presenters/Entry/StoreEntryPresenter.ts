import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Entry from '../../../../Domain/Entities/Entry';

export default class StoreEntryPresenter implements IPresenter {
  private result: Entry;

  public constructor(result: Entry) {
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
      purchases: this.result.getPurchases(),
    };
  }
}

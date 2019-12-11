import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Entry from '../../../../Domain/Entities/Entry';

export default class GetAllEntriesPresenter implements IPresenter {
  private result: any;

  public constructor(result: Entry[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const entryResult: any[] = [];

    this.result.forEach((entry: Entry): void => {
      entryResult.push({
        id: entry.getId(),
        date: entry.getDate(),
        observations: entry.getObservations(),
        purchases: entry.getPurchases(),
      });
    });

    return entryResult;
  }
}

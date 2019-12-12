import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Entry from '../../../../Domain/Entities/Entry';
import Purchase from '../../../../Domain/Entities/Purchase';

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
      let purchases = [];
      entry.getPurchases().forEach((purchase: Purchase): void => {
        purchases.push({
          id: purchase.getId(),
          quantity: purchase.getQuantity(),
          provider: purchase.getProvider(),
          product: {
            id: purchase.getProduct().getId(),
            name: purchase.getProduct().getName(),
          },
        });
      });
      entryResult.push({
        id: entry.getId(),
        date: entry.getDate(),
        observations: entry.getObservations(),
        purchases
      });
    });

    return entryResult;
  }
}

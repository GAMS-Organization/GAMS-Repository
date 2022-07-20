import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Departure from '../../../../Domain/Entities/Departure';
import Consumption from '../../../../Domain/Entities/Consumption';

export default class GetAllDeparturePresenter implements IPresenter {
  private result: any;

  public constructor(result: Departure[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const departureResult: any[] = [];

    this.result.forEach((departure: Departure): void => {
      let consumptions = [];
      departure.getConsumptions().forEach((consumption: Consumption): void => {
        consumptions.push({
          id: consumption.getId(),
          quantity: consumption.getQuantity(),
          product: {
            id: consumption.getProduct().getId(),
            name: consumption.getProduct().getName(),
          },
        });
      });
      departureResult.push({
        id: departure.getId(),
        date: departure.getDate(),
        observations: departure.getObservations(),
        workOrderId: departure.getWorkOrder() ? departure.getWorkOrder().getId() : null,
        consumptions,
      });
    });

    return departureResult;
  }
}

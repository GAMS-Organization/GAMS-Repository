import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import WorkOrder from '../../../../Domain/Entities/WorkOrder';

export default class StoreWorkOrderPresenter implements IPresenter {
  private result: WorkOrder;

  public constructor(result: WorkOrder) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      orderDate: this.result.getOrderDate(),
      startDate: this.result.getStartDate(),
      realizationDate: this.result.getRealizationDate(),
      priority: this.result.getPriority(),
      state: this.result.getState(),
      comment: this.result.getComment(),
      taskDescription: this.result.getTaskDescription(),
      asset: {
        code: this.result.getAsset().getCode(),
        sector: this.result
          .getAsset()
          .getSector()
          .getName(),
        area: this.result
          .getAsset()
          .getArea()
          .getName(),
        service: this.result
          .getAsset()
          .getService()
          .getName(),
        element: this.result
          .getAsset()
          .getElement()
          .getName(),
      },
      user: {
        id: this.result.getId(),
        name: this.result.getUser().getName(),
        surname: this.result.getUser().getSurname(),
      },
      workers: this.result.getUserWorkOrders()
        ? this.result.getUserWorkOrders().map(worker => {
            return {
              id: worker.getId(),
              name: worker.getUser().getName(),
              surname: worker.getUser().getSurname(),
            };
          })
        : null,
    };
  }
}

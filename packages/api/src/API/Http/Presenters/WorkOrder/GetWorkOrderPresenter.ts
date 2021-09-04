import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import WorkOrder from '../../../../Domain/Entities/WorkOrder';

export default class GetWorkOrderPresenter implements IPresenter {
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
      priority: this.result.getPriority(),
      comment: this.result.getComment(),
      user: {
        id: this.result.getId(),
        name: this.result.getUser().getName(),
        surname: this.result.getUser().getSurname(),
      },
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
      state: this.result.getState(),
      startDate: this.result.getStartDate() || null,
      realizationDate: this.result.getRealizationDate() || null,
      taskDescription: this.result.getTaskDescription() || null,
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

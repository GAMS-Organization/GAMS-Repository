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
      asset: this.result.getAsset(),
      user: this.result.getUser(),
      workers: this.result.getUserWorkOrders(),
    };
  }
}

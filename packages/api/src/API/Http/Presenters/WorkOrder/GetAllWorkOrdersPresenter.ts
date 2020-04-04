import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import WorkOrder from '../../../../Domain/Entities/WorkOrder';

export default class GetAllWorkOrdersPresenter implements IPresenter {
  private result: any;

  public constructor(result: WorkOrder[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const workOrderResult: any[] = [];

    this.result.forEach((workOrder: WorkOrder): void => {
      workOrderResult.push({
        id: workOrder.getId(),
        orderDate: workOrder.getOrderDate(),
        priority: workOrder.getPriority(),
        comment: workOrder.getComment(),
        user: workOrder.getUser(),
        asset: workOrder.getAsset(),
        state: workOrder.getState(),
        startDate: workOrder.getStartDate()? workOrder.getStartDate() : null,
        realizationDate: workOrder.getRealizationDate()? workOrder.getRealizationDate() : null,
      });
    });

    return workOrderResult;
  }
}

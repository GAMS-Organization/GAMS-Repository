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
        user: {
          name: workOrder.getUser().getName(),
          surname: workOrder.getUser().getSurname(),
          id: workOrder.getUser().getId(),
        },
        asset: {
          code: workOrder.getAsset().getCode(),
          sector: workOrder
            .getAsset()
            .getSector()
            .getName(),
          area: workOrder
            .getAsset()
            .getArea()
            .getName(),
          service: workOrder
            .getAsset()
            .getService()
            .getName(),
          element: workOrder
            .getAsset()
            .getElement()
            .getName(),
        },
        state: workOrder.getState(),
        startDate: workOrder.getStartDate() ? workOrder.getStartDate() : null,
        realizationDate: workOrder.getRealizationDate() ? workOrder.getRealizationDate() : null,
        workers: workOrder.getUserWorkOrders() ? workOrder.getUserWorkOrders() : null,
      });
    });

    return workOrderResult;
  }
}

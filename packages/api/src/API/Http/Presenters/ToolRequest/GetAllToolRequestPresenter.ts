import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import ToolRequest from '../../../../Domain/Entities/ToolRequest';

export default class GetAllToolRequestPresenter implements IPresenter {
  private result: any;

  public constructor(result: ToolRequest[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const toolRequestResult: any[] = [];

    this.result.forEach((toolRequest: ToolRequest): void => {
      toolRequestResult.push({
        id: toolRequest.getId(),
        tool: toolRequest.getTool(),
        user: {
          name: toolRequest.getUser().getName(),
          surname: toolRequest.getUser().getSurname(),
          id: toolRequest.getUser().getId(),
        },
        date: toolRequest.getDate(),
        area: {
          name: toolRequest.getArea().getName(),
          id: toolRequest.getArea().getId(),
          code: toolRequest.getArea().getCode(),
        },
        status: toolRequest.getStatus(),
        quantity: toolRequest.getQuantity(),
      });
    });

    return toolRequestResult;
  }
}

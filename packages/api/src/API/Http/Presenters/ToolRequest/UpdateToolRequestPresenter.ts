import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import ToolRequest from '../../../../Domain/Entities/ToolRequest';

export default class UpdateToolRequestPresenter implements IPresenter {
  private result: ToolRequest;

  public constructor(result: ToolRequest) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      tool: this.result.getTool(),
      user: {
        name: this.result.getUser().getName(),
        surname: this.result.getUser().getSurname(),
        id: this.result.getUser().getId(),
      },
      date: this.result.getDate(),
      area: {
        name: this.result.getArea().getName(),
        id: this.result.getArea().getId(),
        code: this.result.getArea().getCode(),
      },
      status: this.result.getStatus(),
      quantity: this.result.getQuantity(),
    };
  }
}

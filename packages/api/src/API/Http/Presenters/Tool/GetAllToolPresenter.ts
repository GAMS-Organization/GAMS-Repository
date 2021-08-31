import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Tool from '../../../../Domain/Entities/Tool';

export default class GetAllToolPresenter implements IPresenter {
  private result: any;

  public constructor(result: Tool[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const toolResult: any[] = [];

    this.result.forEach((tool: Tool): void => {
      toolResult.push({
        id: tool.getId(),
        name: tool.getName(),
        totalQuantity: tool.getTotalQuantity(),
        borrowQuantity: tool.getBorrowQuantity(),
      });
    });

    return toolResult;
  }
}

import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Event from '../../../../Domain/Entities/Event';

export default class StoreEventPresenter implements IPresenter {
  private result: Event;

  public constructor(result: Event) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    return {
      id: this.result.getId(),
      title: this.result.getTitle(),
      description: this.result.getDescription(),
      startDate: this.result.getStartDate(),
      endDate: this.result.getEndDate(),
      allDay: this.result.getAllDay(),
      workers: this.result.getWorkers(),
    };
  }
}

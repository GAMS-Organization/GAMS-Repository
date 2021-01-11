import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Event from '../../../../Domain/Entities/Event';

export default class GetAllEntriesPresenter implements IPresenter {
  private result: any;

  public constructor(result: Event[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const eventResult: any[] = [];

    this.result.forEach((event: Event): void => {
      eventResult.push({
        id: event.getId(),
        title: event.getTitle(),
        description: event.getDescription(),
        startDate: event.getStartDate(),
        endDate: event.getEndDate(),
        allDay: event.getAllDay(),
        workers: event.getWorkers(),
      });
    });

    return eventResult;
  }
}

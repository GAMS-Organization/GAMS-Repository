import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Service from '../../../../Domain/Entities/Service';

export default class GetAllServicesPresenter implements IPresenter {
  private result: any;

  public constructor(result: Service[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const serviceResult: any[] = [];

    this.result.forEach((service: Service): void => {
      serviceResult.push({
        id: service.getId(),
        name: service.getName(),
        code: service.getCode(),
      });
    });

    return serviceResult;
  }
}

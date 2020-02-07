import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Area from '../../../../Domain/Entities/Area';

export default class GetAllAreasPresenter implements IPresenter {
  private result: any;

  public constructor(result: Area[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const areaResult: any[] = [];

    this.result.forEach((area: Area): void => {
      areaResult.push({
        id: area.getId(),
        name: area.getName(),
        code: area.getCode(),
        sector: area.getSector().getName(),
        services: area.getServicesNames(),
      });
    });

    return areaResult;
  }
}

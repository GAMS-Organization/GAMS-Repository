import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Sector from '../../../../Domain/Entities/Sector';

export default class GetAllSectorsPresenter implements IPresenter {
  private result: any;

  public constructor(result: Sector[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const sectorResult: any[] = [];

    this.result.forEach((sector: Sector): void => {
      sectorResult.push({
        id: sector.getId(),
        name: sector.getName(),
        code: sector.getCode(),
      });
    });

    return sectorResult;
  }
}

import IPresenter from '../../../../Infrastructure/Presenters/Contracts/IPresenter';
import Asset from '../../../../Domain/Entities/Asset';

export default class GetAllAssetsPresenter implements IPresenter {
  private result: any;

  public constructor(result: Asset[]) {
    this.result = result;
  }

  public toJson(): string {
    return JSON.stringify(this.getData());
  }

  public getData(): object {
    const assetResult: any[] = [];

    this.result.forEach((asset: Asset): void => {
      assetResult.push({
        id: asset.getId(),
        code: asset.getCode(),
        description: asset.getDescription(),
        sector: asset.getSector(),
        area: asset.getArea(),
        service: asset.getService(),
        element: asset.getElement(),
      });
    });

    return assetResult;
  }
}

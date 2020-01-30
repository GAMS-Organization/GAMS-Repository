import { inject, injectable } from 'inversify';
import Asset from '../../../Domain/Entities/Asset';
import StoreAssetCommand from '../../Commands/Asset/StoreAssetCommand';
import AssetService from '../../../Domain/Services/AssetService';

@injectable()
export default class StoreAssetHandler {
  private assetService: AssetService;


  public constructor(
    @inject(AssetService) assetService: AssetService,
  ) {
    this.assetService = assetService;
  }

  public async execute(command: StoreAssetCommand): Promise<Asset> {

    return await this.assetService.setRelationsToAsset(command.getSector(), command.getArea(), command.getService(), command.getElement());
  }
}

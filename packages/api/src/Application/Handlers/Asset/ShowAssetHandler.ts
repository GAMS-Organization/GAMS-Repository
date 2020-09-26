import { inject, injectable } from 'inversify';
import Asset from '../../../Domain/Entities/Asset';
import ShowAssetCommand from '../../Commands/Asset/ShowAssetCommand';
import AssetService from '../../../Domain/Services/AssetService';

@injectable()
export default class ShowAssetHandler {
  private assetService: AssetService;

  public constructor(@inject(AssetService) assetService: AssetService) {
    this.assetService = assetService;
  }

  public async execute(command: ShowAssetCommand): Promise<Asset[]> {
    return await this.assetService.findSpecificAsset(
      command.getSectorId(),
      command.getAreaId(),
      command.getServiceId(),
      command.getElementId(),
    );
  }
}

import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyAssetCommand from '../../../../Application/Commands/Asset/DestroyAssetCommand';

@injectable()
export default class DestroyAssetAdapter {
  public from(request: Request): DestroyAssetCommand {
    const assetId = parseInt(request.params.id);

    if (!assetId) {
      throw new ValidationException('Asset id are required');
    }

    if (assetId < 1) {
      throw new ValidationException('Asset id is not valid');
    }

    return new DestroyAssetCommand(assetId);
  }
}

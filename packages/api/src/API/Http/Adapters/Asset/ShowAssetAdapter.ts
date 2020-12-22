import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import ShowAssetCommand from '../../../../Application/Commands/Asset/ShowAssetCommand';

@injectable()
export default class ShowAssetAdapter {
  public from(request: Request): ShowAssetCommand {
    const sector = parseInt(request.query.sector);
    if (!sector) {
      throw new ValidationException('Sector id is required');
    }
    const area = parseInt(request.query.area);
    if (!area) {
      throw new ValidationException('Area id is required');
    }
    const service = parseInt(request.query.service);
    if (!service) {
      throw new ValidationException('Service id is required');
    }
    const element = parseInt(request.query.element);
    if (!element) {
      throw new ValidationException('Element id is required');
    }

    return new ShowAssetCommand(sector, area, service, element);
  }
}

import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import ShowAssetCommand from '../../../../Application/Commands/Asset/ShowAssetCommand';

@injectable()
export default class ShowAssetAdapter {
  public from(request: Request): ShowAssetCommand {
    //@ts-ignore
    const sector = parseInt(request.query.sector);
    if (!sector) {
      throw new ValidationException('El id del sector es requerido');
    }
    //@ts-ignore
    const area = parseInt(request.query.area);
    if (!area) {
      throw new ValidationException('El id del área es requerido');
    }
    //@ts-ignore
    const service = parseInt(request.query.service);
    if (!service) {
      throw new ValidationException('El id del servicio es requerido');
    }
    //@ts-ignore
    const element = parseInt(request.query.element);
    if (!element) {
      throw new ValidationException('El id del elemento es requerido');
    }

    return new ShowAssetCommand(sector, area, service, element);
  }
}

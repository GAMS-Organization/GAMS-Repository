import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyAreaCommand from '../../../../Application/Commands/Area/DestroyAreaCommand';

@injectable()
export default class DestroyAreaAdapter {
  public from(request: Request): DestroyAreaCommand {
    const areaId = parseInt(request.params.id);

    if (!areaId) {
      throw new ValidationException('Area id are required');
    }

    if (areaId < 1) {
      throw new ValidationException('Area id is not valid');
    }

    return new DestroyAreaCommand(areaId);
  }
}

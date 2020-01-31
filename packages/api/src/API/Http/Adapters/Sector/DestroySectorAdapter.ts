import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroySectorCommand from '../../../../Application/Commands/Sector/DestroySectorCommand';

@injectable()
export default class DestroySectorAdapter {
  public from(request: Request): DestroySectorCommand {
    const sectorId = parseInt(request.params.id);

    if (!sectorId) {
      throw new ValidationException('Sector id are required');
    }

    if (sectorId < 1) {
      throw new ValidationException('Sector id is not valid');
    }

    return new DestroySectorCommand(sectorId);
  }
}

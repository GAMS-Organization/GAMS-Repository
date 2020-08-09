import ShowSectorCommand from '../../../../Application/Commands/Sector/ShowSectorCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowSectorAdapter {
  public from(request: Request): ShowSectorCommand {
    const sectorId = parseInt(request.params.id);

    if (!sectorId) {
      throw new ValidationException('Sector id are required');
    }

    if (sectorId < 1) {
      throw new ValidationException('Sector id is not valid');
    }

    return new ShowSectorCommand(sectorId);
  }
}

import ShowSectorCommand from '../../../../Application/Commands/Sector/ShowSectorCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowSectorAdapter {
  public from(request: Request): ShowSectorCommand {
    const sectorId = parseInt(request.params.id);

    if (!sectorId) {
      throw new ValidationException('El id del sector es requerido');
    }

    if (sectorId < 1) {
      throw new ValidationException('El id del sector no es válido');
    }

    return new ShowSectorCommand(sectorId);
  }
}

import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroySectorCommand from '../../../../Application/Commands/Sector/DestroySectorCommand';

@injectable()
export default class DestroySectorAdapter {
  public from(request: Request): DestroySectorCommand {
    const sectorId = parseInt(request.params.id);

    if (!sectorId) {
      throw new ValidationException('El id del sector es requerido');
    }

    if (sectorId < 1) {
      throw new ValidationException('El id del sector no es válido');
    }

    return new DestroySectorCommand(sectorId);
  }
}

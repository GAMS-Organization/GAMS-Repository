import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyEntryCommand from '../../../../Application/Commands/Entry/DestroyEntryCommand';

@injectable()
export default class DestroyEntryAdapter {
  public from(request: Request): DestroyEntryCommand {
    const entryId = parseInt(request.params.id);

    if (!entryId) {
      throw new ValidationException('El id de la entrada es requerido');
    }

    if (entryId < 1) {
      throw new ValidationException('El id de la entrada no es válido');
    }

    return new DestroyEntryCommand(entryId);
  }
}

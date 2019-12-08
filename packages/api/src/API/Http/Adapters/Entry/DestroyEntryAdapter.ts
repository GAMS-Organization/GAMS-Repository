import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyEntryCommand from '../../../../Application/Commands/Entry/DestroyEntryCommand';

@injectable()
export default class DestroyEntryAdapter {
  public from(request: Request): DestroyEntryCommand {
    const entryId = parseInt(request.params.id);

    if (!entryId) {
      throw new ValidationException('Entry id are required');
    }

    if (entryId < 1) {
      throw new ValidationException('Entry id is not valid');
    }

    return new DestroyEntryCommand(entryId);
  }
}

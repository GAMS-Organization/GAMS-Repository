import ShowEntryCommand from '../../../../Application/Commands/Entry/ShowEntryCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowEntryAdapter {
  public from(request: Request): ShowEntryCommand {
    const entryId = parseInt(request.params.id);

    if (!entryId) {
      throw new ValidationException('Entry id are required');
    }

    if (entryId < 1) {
      throw new ValidationException('Entry id is not valid');
    }

    return new ShowEntryCommand(entryId);
  }
}

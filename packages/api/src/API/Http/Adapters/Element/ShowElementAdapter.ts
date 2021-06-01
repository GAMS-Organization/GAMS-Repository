import ShowElementCommand from '../../../../Application/Commands/Element/ShowElementCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowElementAdapter {
  public from(request: Request): ShowElementCommand {
    const elementId = parseInt(request.params.id);

    if (!elementId) {
      throw new ValidationException('Element id are required');
    }

    if (elementId < 1) {
      throw new ValidationException('Element id is not valid');
    }

    return new ShowElementCommand(elementId);
  }
}

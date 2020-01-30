import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyElementCommand from '../../../../Application/Commands/Element/DestroyElementCommand';

@injectable()
export default class DestroyElementAdapter {
  public from(request: Request): DestroyElementCommand {
    const elementId = parseInt(request.params.id);

    if (!elementId) {
      throw new ValidationException('Element id are required');
    }

    if (elementId < 1) {
      throw new ValidationException('Element id is not valid');
    }

    return new DestroyElementCommand(elementId);
  }
}

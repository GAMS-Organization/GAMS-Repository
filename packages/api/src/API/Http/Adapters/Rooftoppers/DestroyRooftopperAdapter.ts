import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyRooftopperCommand from '../../../../Application/Commands/Rooftoppers/DestroyRooftopperCommand';

@injectable()
export default class DestroyRooftopperAdapter {
  public from(request: Request): DestroyRooftopperCommand {
    const rooftopperId = request.params.id;

    if (!rooftopperId) {
      throw new ValidationException('Rooftopper id are required');
    }

    if (rooftopperId < 1) {
      throw new ValidationException('Rooftopper id is not valid');
    }

    return new DestroyRooftopperCommand(rooftopperId);
  }
}

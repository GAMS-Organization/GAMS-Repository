import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DisableRooftopperCommand from '../../../../Application/Commands/Rooftoppers/DisableRooftopperCommand';

@injectable()
export default class DisableRooftopperByIdAdapter {
  public from(request: Request): DisableRooftopperCommand {
    const rooftopperId = request.params.id;

    if (!rooftopperId) {
      throw new ValidationException('Rooftopper id are required');
    }

    if (rooftopperId < 1) {
      throw new ValidationException('Rooftopper id is not valid');
    }

    return new DisableRooftopperCommand(rooftopperId);
  }
}

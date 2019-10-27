import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import EnableRooftopperCommand from '../../../../Application/Commands/Rooftoppers/EnableRooftopperCommand';

@injectable()
export default class EnableRooftopperByIdAdapter {
  public from(request: Request): EnableRooftopperCommand {
    const rooftopperId = request.params.id;

    if (!rooftopperId) {
      throw new ValidationException('Rooftopper id are required');
    }

    if (rooftopperId < 1) {
      throw new ValidationException('Rooftopper id is not valid');
    }

    return new EnableRooftopperCommand(rooftopperId);
  }
}

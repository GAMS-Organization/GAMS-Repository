import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import ShowRooftoppersByIdCommand from '../../../../Application/Commands/Rooftoppers/ShowRooftoppersByIdCommand';

@injectable()
export default class ShowRooftoppersByIdAdapter {
  public from(request: Request): ShowRooftoppersByIdCommand {
    const rooftopperId = request.params.id;

    if (!rooftopperId) {
      throw new ValidationException('Rooftopper id are required');
    }

    if (rooftopperId < 1) {
      throw new ValidationException('Rooftopper id is not valid');
    }

    return new ShowRooftoppersByIdCommand(rooftopperId);
  }
}

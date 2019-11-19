import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import ShowRooftopperBySlugCommand from '../../../../Application/Commands/Rooftoppers/showRooftopperBySlugCommand';

@injectable()
export default class ShowRooftopperBySlugAdapter {
  public from(request: Request): ShowRooftopperBySlugCommand {
    const rooftopperSlug = request.params.slug;

    if (!rooftopperSlug) {
      throw new ValidationException('Rooftopper slug is required');
    }

    return new ShowRooftopperBySlugCommand(rooftopperSlug);
  }
}

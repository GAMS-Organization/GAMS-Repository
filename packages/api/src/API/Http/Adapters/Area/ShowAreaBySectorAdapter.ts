import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import ShowAreaBySectorCommand from '../../../../Application/Commands/Area/ShowAreaBySectorCommand';

@injectable()
export default class ShowAreaBySectorAdapter {
  public from(request: Request): ShowAreaBySectorCommand {
    const name = request.params.name.replace(/_/gi, ' ', );

    console.log("-----------------------------------------------------------------------------", name);
    if (!name) {
      throw new ValidationException('Sector name is required');
    }

    return new ShowAreaBySectorCommand(name);
  }
}

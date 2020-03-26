import ShowServiceCommand from '../../../../Application/Commands/Service/ShowServiceCommand';
import { Request } from 'express';
import { injectable } from 'inversify';

@injectable()
export default class ShowServiceAdapter {
  public from(request: Request): ShowServiceCommand {
    const serviceName = request.params.name;

    return new ShowServiceCommand(serviceName);
  }
}

import IndexEventsByMonthCommand from '../../../../Application/Commands/Event/IndexEventsByMonthCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class IndexEventsByMonthAdapter {
  public from(request: Request): IndexEventsByMonthCommand {
    const month = parseInt(request.params.month);

    if (!month) {
      throw new ValidationException('Month are required');
    }

    if (month < 1 || month > 12) {
      throw new ValidationException('Month is not valid');
    }

    return new IndexEventsByMonthCommand(month);
  }
}

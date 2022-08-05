import IndexEventsByMonthCommand from '../../../../Application/Commands/Event/IndexEventsByMonthCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class IndexEventsByMonthAdapter {
  public from(request: Request): IndexEventsByMonthCommand {
    const month = parseInt(request.params.month);

    if (!month) {
      throw new ValidationException('El mes es requerido');
    }

    if (month < 1 || month > 12) {
      throw new ValidationException('El mes no es válido');
    }

    return new IndexEventsByMonthCommand(month);
  }
}

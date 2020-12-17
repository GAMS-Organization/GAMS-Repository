import { Request } from 'express';
import { injectable } from 'inversify';
import StoreEventCommand from '../../../../Application/Commands/Event/StoreEventCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeEventSchema } from '../../Validations/Schemas/EventSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreEventAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreEventCommand {
    const error = this.validator.validate(request.body, storeEventSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreEventCommand(
      request.body.title,
      request.body.description,
      request.body.startDate ? request.body.startDate : null,
      request.body.endDate ? request.body.endDate : null,
      request.body.allDay ? request.body.allDay : false,
      request.body.workersId ? request.body.workersId : null,
    );
  }
}

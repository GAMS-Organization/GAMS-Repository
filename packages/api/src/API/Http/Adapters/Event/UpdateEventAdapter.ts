import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateEventCommand from '../../../../Application/Commands/Event/UpdateEventCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateEventSchema } from '../../Validations/Schemas/EventSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateEventAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateEventCommand {
    const error = this.validator.validate(request.body, updateEventSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateEventCommand(
      parseInt(request.params.id),
      request.body.title,
      request.body.description,
      request.body.startDate ? request.body.startDate : null,
      request.body.endDate ? request.body.endDate : null,
      request.body.allDay ? request.body.allDay : null,
      request.body.workersId ? request.body.workersId : null,
    );
  }
}

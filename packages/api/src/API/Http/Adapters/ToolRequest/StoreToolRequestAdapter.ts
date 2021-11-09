import { Request } from 'express';
import { injectable } from 'inversify';
import StoreToolRequestCommand from '../../../../Application/Commands/ToolRequest/StoreToolRequestCommand';
import Validator from '../../Validations/Utils/Validator';
import { storeToolRequestSchema } from '../../Validations/Schemas/ToolRequestSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class StoreToolRequestAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): StoreToolRequestCommand {
    const error = this.validator.validate(request.body, storeToolRequestSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new StoreToolRequestCommand(
      request.body.toolId,
      request.body.authorId,
      request.body.date,
      request.body.areaId,
      parseInt(request.body.quantity),
    );
  }
}

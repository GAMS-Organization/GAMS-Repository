import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateToolRequestCommand from '../../../../Application/Commands/ToolRequest/UpdateToolRequestCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateToolRequestSchema } from '../../Validations/Schemas/ToolRequestSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateToolRequestAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateToolRequestCommand {
    const error = this.validator.validate(request.body, updateToolRequestSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateToolRequestCommand(
      parseInt(request.params.id),
      request.body.toolId,
      request.body.status,
      request.body.areaId,
    );
  }
}

import { Request } from 'express';
import { injectable } from 'inversify';
import UpdateProductCommand from '../../../../Application/Commands/Product/UpdateProductCommand';
import Validator from '../../Validations/Utils/Validator';
import { updateProductSchema } from '../../Validations/Schemas/ProductSchema';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class UpdateProductAdapter {
  private validator: Validator;

  public constructor() {
    this.validator = new Validator();
  }

  public from(request: Request): UpdateProductCommand {
    const error = this.validator.validate(request.body, updateProductSchema);

    if (error) {
      throw new ValidationException(JSON.stringify(this.validator.validationResult(error.details)));
    }

    return new UpdateProductCommand(parseInt(request.params.id), request.body.name);
  }
}

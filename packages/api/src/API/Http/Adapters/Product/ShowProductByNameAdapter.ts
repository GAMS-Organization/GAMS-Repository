import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import ShowProductByNameCommand from '../../../../Application/Commands/Product/ShowProductByNameCommand';

@injectable()
export default class ShowProductByNameAdapter {
  public from(request: Request): ShowProductByNameCommand {
    const name = request.params.name;

    if (!name) {
      throw new ValidationException('Product name is required');
    }

    return new ShowProductByNameCommand(name);
  }
}

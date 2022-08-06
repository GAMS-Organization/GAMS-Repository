import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import ShowProductByNameCommand from '../../../../Application/Commands/Product/ShowProductByNameCommand';

@injectable()
export default class ShowProductByNameAdapter {
  public from(request: Request): ShowProductByNameCommand {
    const name = request.params.name;

    if (!name) {
      throw new ValidationException('El nombre del producto es requerido');
    }

    return new ShowProductByNameCommand(name);
  }
}

import ShowProductCommand from '../../../../Application/Commands/Product/ShowProductCommand';
import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';

@injectable()
export default class ShowProductAdapter {
  public from(request: Request): ShowProductCommand {
    const productId = parseInt(request.params.id);

    if (!productId) {
      throw new ValidationException('El id del producto es requerido');
    }

    if (productId < 1) {
      throw new ValidationException('El id del producto no es válido');
    }

    return new ShowProductCommand(productId);
  }
}

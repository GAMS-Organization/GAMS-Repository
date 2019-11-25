import { Request } from 'express';
import { injectable } from 'inversify';
import ValidationException from '../../../../Application/Exceptions/ValidationException';
import DestroyProductCommand from '../../../../Application/Commands/Product/DestroyProductCommand';

@injectable()
export default class DestroyProductAdapter {
    public from(request: Request): DestroyProductCommand {
        const productId = parseInt(request.params.id);

        if (!productId) {
            throw new ValidationException('Product id are required');
        }

        if (productId < 1) {
            throw new ValidationException('Product id is not valid');
        }

        return new DestroyProductCommand(productId);
    }
}

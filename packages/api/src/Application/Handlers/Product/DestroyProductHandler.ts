import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IProductRepository from '../../../Domain/Interfaces/IProductRepository';
import DestroyProductCommand from '../../Commands/Product/DestroyProductCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';

@injectable()
export default class DestroyProductHandler {
    private productRepository: IProductRepository;

    public constructor(
        @inject(INTERFACES.IProductRepository) productRepository: IProductRepository,
    ) {
        this.productRepository = productRepository;
    }

    public async execute(command: DestroyProductCommand): Promise<boolean> {
        const product = await this.productRepository.findOneById(command.getId());

        if (!product) {
            throw new EntityNotFoundException(`Product with id: ${command.getId()} not found`);
        }
        const productWasDestroyed = await this.productRepository.destroy(product);

        if (!productWasDestroyed) {
            throw new CannotDeleteEntity(`Product with id: ${command.getId()} could not be deleted`);
        }

        return productWasDestroyed;
    }
}

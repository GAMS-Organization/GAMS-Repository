import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IProductRepository from '../../../Domain/Interfaces/IProductRepository';
import ShowProductByNameCommand from '../../Commands/Product/ShowProductByNameCommand';
import Product from '../../../Domain/Entities/Product';

@injectable()
export default class ShowProductByNameHandler{
    private productRepository: IProductRepository;

    public constructor(@inject(INTERFACES.IProductRepository) productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    public async execute(command: ShowProductByNameCommand): Promise<Product> {
        const product = await this.productRepository.findOneByProductName(command.getName());

        if (!product) {
            throw new EntityNotFoundException(`Product with slug: ${command.getName()} not found`);
        }

        return product;
    }
}

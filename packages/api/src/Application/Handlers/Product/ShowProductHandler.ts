import IProductRepository from '../../../Domain/Interfaces/IProductRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import ShowProductCommand from '../../Commands/Product/ShowProductCommand';
import Product from '../../../Domain/Entities/Product';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class ShowProductHandler {
  private productRepository: IProductRepository;

  public constructor(@inject(INTERFACES.IProductRepository) productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(command: ShowProductCommand): Promise<Product> {
    const product = await this.productRepository.findOneById(command.getId());
    if (!product) {
      throw new EntityNotFoundException(`Product with id: ${command.getId()} not found`);
    }
    return product;
  }
}

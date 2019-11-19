import IProdcutRepository from '../../../Domain/Interfaces/IProductRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreProductCommand from '../../Commands/Product/StoreProductCommand';
import Product from '../../../Domain/Entities/Product';

@injectable()
export default class StoreUserHandler {
  private productRepository: IProdcutRepository;
  public constructor(@inject(INTERFACES.IProductRepository) productRepository: IProdcutRepository) {
    this.productRepository = productRepository;
  }

  public async execute(command: StoreProductCommand): Promise<Product> {
    const product = new Product(command.getName());
    return await this.productRepository.persist(product);
  }
}

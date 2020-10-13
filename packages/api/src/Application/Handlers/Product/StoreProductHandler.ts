import IProductRepository from '../../../Domain/Interfaces/IProductRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreProductCommand from '../../Commands/Product/StoreProductCommand';
import Product from '../../../Domain/Entities/Product';

@injectable()
export default class StoreProductHandler {
  private productRepository: IProductRepository;
  public constructor(@inject(INTERFACES.IProductRepository) productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(command: StoreProductCommand): Promise<Product> {
    const product = new Product(command.getName());
    return await this.productRepository.persist(product);
  }
}

import IProductRepository from '../../../Domain/Interfaces/IProductRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateProductCommand from '../../Commands/Product/UpdateProductCommand';
import Product from '../../../Domain/Entities/Product';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class UpdateProductHandler {
  private productRepository: IProductRepository;
  public constructor(@inject(INTERFACES.IProductRepository) productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(command: UpdateProductCommand): Promise<Product> {
    const product = await this.productRepository.findOneById(command.getId());
    if (!product) {
      throw new EntityNotFoundException(`No se encontró el producto con id: ${command.getId()}`);
    }
    product.setName(command.getName());
    return await this.productRepository.persist(product);
  }
}

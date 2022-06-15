import IProductRepository from '../../../Domain/Interfaces/IProductRepository';
import Product from '../../../Domain/Entities/Product';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeProductRepository extends TypeRepository implements IProductRepository {
  public async findAll(): Promise<Product[]> {
    return await this.repository(Product).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Product[]> {
    return await this.repository(Product).find({
      skip: initialIndex,
      take: limit,
      order: {
        name: 'ASC',
      },
    });
  }

  public async findOneById(id: number): Promise<Product> {
    return await this.repository(Product).findOne(id);
  }

  public async count(): Promise<number> {
    return await this.repository(Product).count();
  }

  public async findOneByProductName(name: string): Promise<Product> {
    return await this.repository(Product).findOne({ where: { name: name } });
  }

  public async persist(product: Product): Promise<Product> {
    return await this.repository(Product).save(product);
  }

  public async destroy(product: Product): Promise<boolean> {
    const result = await this.repository(Product).delete(product.getId());

    return result && result.affected === 1;
  }
}

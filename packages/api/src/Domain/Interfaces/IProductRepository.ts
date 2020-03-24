import Product from '../Entities/Product';

export default interface IProductRepository {
  findAll(): Promise<Product[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Product[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<Product>;
  findOneByProductName(name: string): Promise<Product>;
  persist(product: Product): Promise<Product>;
  destroy(product: Product): Promise<boolean>;
}

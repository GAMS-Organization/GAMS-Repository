import Stock from '../Entities/Stock';

export default interface IStockRepository {
  findAll(): Promise<Stock[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Stock[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<Stock>;
  findOneByStockProduct(product: number): Promise<Stock>;
  persist(role: Stock): Promise<Stock>;
  destroy(role: Stock): Promise<boolean>;
}

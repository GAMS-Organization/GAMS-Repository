import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IStockRepository from '../../../Domain/Interfaces/IStockRepository';
import Stock from '../../../Domain/Entities/Stock';

@injectable()
export default class TypeStockRepository extends TypeRepository implements IStockRepository {
  public async findAll(): Promise<Stock[]> {
    return await this.repository(Stock).find({ relations: ['product'] });
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Stock[]> {
    return await this.repository(Stock).find({
      skip: initialIndex,
      take: limit,
      relations: ['product'],
      order: {
        product: {
          name: 'DESC',
        },
      },
    });
  }

  public async count(): Promise<number> {
    return await this.repository(Stock).count();
  }

  public async findOneById(id: number): Promise<Stock> {
    return await this.repository(Stock).findOne({ where: { id: id }, relations: ['product'] });
  }

  public async findOneByStockProduct(id: number): Promise<Stock> {
    return await this.repository(Stock).findOne({ where: { product: id }, relations: ['product'] });
  }

  public async persist(stock: Stock): Promise<Stock> {
    return await this.repository(Stock).save(stock);
  }

  public async destroy(stock: Stock): Promise<boolean> {
    const result = await this.repository(Stock).delete(stock.getId());

    return result && result.affected === 1;
  }
}

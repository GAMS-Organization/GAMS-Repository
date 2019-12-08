import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IStockEntryRepository from '../../../Domain/Interfaces/IStockEntryRepository';
import StockEntry from '../../../Domain/Entities/StockEntry';

@injectable()
export default class TypeStockEntryRepository extends TypeRepository implements IStockEntryRepository {
  public async findAll(): Promise<StockEntry[]> {
    return await this.repository(StockEntry).find();
  }

  public async findOneById(id: number): Promise<StockEntry> {
    return await this.repository(StockEntry).findOne(id);
  }

  public async findByEntryId(id: number): Promise<StockEntry[]> {
    return await this.repository(StockEntry).find({ where: { entry: id }, relations:['stock', 'entry'] });
  }

  public async findByStockId(id: number): Promise<StockEntry[]> {
    return await this.repository(StockEntry).find({ where: { stock: id }, relations:['stock', 'entry']  });
  }

  public async persist(stockEntry: StockEntry): Promise<StockEntry> {
    return await this.repository(StockEntry).save(stockEntry);
  }

  public async destroy(stockEntry: StockEntry): Promise<boolean> {
    const result = await this.repository(StockEntry).delete(stockEntry.getId());

    return result && result.affected === 1;
  }
}

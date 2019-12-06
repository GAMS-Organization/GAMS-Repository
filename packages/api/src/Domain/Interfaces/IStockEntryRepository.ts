import StockEntry from '../Entities/StockEntry';

export default interface IStockEntryRepository {
  findAll(): Promise<StockEntry[]>;
  findOneById(id: number): Promise<StockEntry>;
  findByEntryId(entryId: number): Promise<StockEntry[]>;
  findByStockId(stockId: number): Promise<StockEntry[]>;
  persist(stockEntry: StockEntry): Promise<StockEntry>;
  destroy(stockEntry: StockEntry): Promise<boolean>;
}

import StockEntry from '../Entities/StockEntry';

export default interface IStockEntryRepository {
  findAll(): Promise<StockEntry[]>;
  findOneById(id: number): Promise<StockEntry>;
  findByEntryId(entryId: number): Promise<StockEntry[]>;
  findByStockId(stockId: number): Promise<StockEntry[]>;
  persist(userRole: StockEntry): Promise<StockEntry>;
  destroy(userRol: StockEntry): Promise<boolean>;
}

import { inject, injectable } from 'inversify';
import IStockEntryRepository from '../Interfaces/IStockEntryRepository';
import IStockRepository from '../Interfaces/IStockRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import StockEntry from '../Entities/StockEntry';
import Entry from '../Entities/Entry';
import Stock from '../Entities/Stock';
import Product from '../Entities/Product';
import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';
// import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';

@injectable()
export default class StockEntryService {
  private stockEntryRepository: IStockEntryRepository;
  private stockRepository: IStockRepository;

  public constructor(
    @inject(INTERFACES.IStockEntryRepository) stockEntryRepository: IStockEntryRepository,
    @inject(INTERFACES.IStockRepository) stockRepository: IStockRepository,
  ) {
    this.stockEntryRepository = stockEntryRepository;
    this.stockRepository = stockRepository;
  }

  public async setStockEntry(entry: Entry, product: Product, quantity: number): Promise<void> {
    const stock = await this.stockRepository.findOneByStockProduct(product.getId());
    if (stock) {
      const actualQuantity = stock.getQuantity();
      stock.setQuantity(actualQuantity + quantity);
      const stockEntry = new StockEntry(stock, entry);
      await this.stockEntryRepository.persist(stockEntry);
      await this.stockRepository.persist(stock);
    } else {
      const stock = new Stock(product, quantity);
      const stockEntry = new StockEntry(stock, entry);
      await this.stockRepository.persist(stock);
      await this.stockEntryRepository.persist(stockEntry);
    }
  }

  public async destroyStockEntriesFromEntry(entryId: number): Promise<void> {
    const stockEntries = await this.stockEntryRepository.findByEntryId(entryId);
    for (const stockEntry of stockEntries) {
      try {
        await this.stockEntryRepository.destroy(stockEntry);
      } catch (e) {
        throw new CannotDeleteEntity(`StockEntry with id: ${stockEntry.getId()} could not be deleted`);
      }
    }
  }

  public async updateQuantityStock( product: Product, quantity: number): Promise<void>{
    const stock = await this.stockRepository.findOneByStockProduct(product.getId());
    const actualQuantity = stock.getQuantity();
    stock.setQuantity(actualQuantity - quantity);
    await this.stockRepository.persist(stock);
  }

  public async newStockEntry(entry: Entry, stock: Stock): Promise<void>{
    await this.stockEntryRepository.persist(new StockEntry(stock, entry));
  }
}

import { inject, injectable } from 'inversify';
import IStockEntryRepository from '../Interfaces/IStockEntryRepository';
import IStockRepository from '../Interfaces/IStockRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import StockEntry from '../Entities/StockEntry';
import Entry from '../Entities/Entry';
import Stock from '../Entities/Stock';
import Product from '../Entities/Product';
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
    const stock = await this.stockRepository.findOneByStockProduct(product.getName());

    //Falla al actualizar porque intenta hacer un insert en lugar de un update
    if (stock) {
      const actualQuantity = stock.getQuantity();
      stock.setQuantity(actualQuantity + quantity);
      await this.stockRepository.persist(stock);
      const stockEntry = new StockEntry(stock, entry);
      await this.stockEntryRepository.persist(stockEntry);
      const stockEntries = stock.getEntriesFromStockEntry();
      stockEntries.push(stockEntry);
      stock.setStockEntry(stockEntries);
    } else {
      const stock = new Stock(product, quantity);
      await this.stockRepository.persist(stock);
      const stockEntry = new StockEntry(stock, entry);
      await this.stockEntryRepository.persist(stockEntry);
      const stockEntries = [stockEntry];
      stock.setStockEntry(stockEntries);
    }
  }
  /*
  public async destroyUserRolesFromUser(userId: number): Promise<void> {
    const userRoles = await this.userRoleRepository.findByUserId(userId);
    for (const userRole of userRoles) {
      try {
        await this.userRoleRepository.destroy(userRole);
      } catch (e) {
        throw new CannotDeleteEntity(`UserRole with id: ${userRole.getId()} could not be deleted`);
      }
    }
  }*/
}

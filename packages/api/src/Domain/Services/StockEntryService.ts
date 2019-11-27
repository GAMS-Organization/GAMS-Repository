import IStockEntryRepository from '../Interfaces/IStockEntryRepository';
import { inject, injectable } from 'inversify';
import IEntryRepository from '../Interfaces/IEntryRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import StockEntry from '../Entities/StockEntry';
import Stock from '../Entities/Stock';
// import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';

@injectable()
export default class StockEntryService {
  private stockEntryRepository: IStockEntryRepository;
  private entryRepository: IEntryRepository;

  public constructor(
    @inject(INTERFACES.IEntryRepository) entryRepository: IEntryRepository,
    @inject(INTERFACES.IStockEntryRepository) stockEntryRepository: IStockEntryRepository,
  ) {
    this.entryRepository = entryRepository;
    this.stockEntryRepository = stockEntryRepository;
  }

  public async setStockEntryToStock(stock: Stock): Promise<Stock> {
    const entries = await this.entryRepository.findByProductName(stock.product.getName());
    const newEntries: StockEntry[] = [];
    for (const entry of entries) {
      //const entryId = entry.getId();
      //Aca puede ser que se registren varias veces la misma entrada en un stock, comparar con UserRoleService.ts
      await this.stockEntryRepository.persist(new StockEntry(stock, entry));
      newEntries.push(new StockEntry(stock, entry));
    }
    stock.setStockEntry(newEntries);
    return stock;
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

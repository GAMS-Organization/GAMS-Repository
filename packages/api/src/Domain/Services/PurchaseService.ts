import IPurchaseRepository from '../Interfaces/IPurchaseRepository';
import { inject, injectable } from 'inversify';
import IProductRepository from '../Interfaces/IProductRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import Purchase from '../Entities/Purchase';
import Entry from '../Entities/Entry';
import StockEntryService from './StockEntryService';
import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';

// import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';

@injectable()
export default class PurchaseService {
  private purchaseRepository: IPurchaseRepository;
  private productRepository: IProductRepository;
  private stockEntryService: StockEntryService;

  public constructor(
    @inject(INTERFACES.IProductRepository) productRepository: IProductRepository,
    @inject(INTERFACES.IPurchaseRepository) purchaseRepository: IPurchaseRepository,
    @inject(StockEntryService) stockEntryService: StockEntryService,
  ) {
    this.productRepository = productRepository;
    this.purchaseRepository = purchaseRepository;
    this.stockEntryService = stockEntryService;
  }

  public async setPurchaseToEntry(
    entry: Entry,
    commandProducts: number[],
    commandQuantities: number[],
    commandProviders: string[],
  ): Promise<Entry> {
    const products = await this.productRepository.findAll();
    for (const product of products) {
      const productId = product.getId();
      if (commandProducts.includes(productId)) {
        let index = commandProducts.indexOf(productId);
        let quantity = commandQuantities[index];
        let provider = commandProviders[index];
        const purchase = new Purchase(quantity, provider, product, entry);
        await this.purchaseRepository.persist(purchase);
        await this.stockEntryService.setStockEntry(entry, product, quantity);
      }
    }
    return entry;
  }

  public async destroyPurchasesFromEntry(entryId: number): Promise<void> {
    const purchases = await this.purchaseRepository.findByEntryId(entryId);
    for (const purchase of purchases) {
      try {
        await this.stockEntryService.updateQuantityStock(purchase.getProduct(), purchase.getQuantity());
        await this.purchaseRepository.destroy(purchase);
      } catch (e) {
        throw new CannotDeleteEntity(`No se pudo borrar la compra con id: ${purchase.getId()}`);
      }
    }
  }
}

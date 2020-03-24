import { inject, injectable } from 'inversify';
import IStockDepartureRepository from '../Interfaces/IStockDepartureRepository';
import IStockRepository from '../Interfaces/IStockRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import StockDeparture from '../Entities/StockDeparture';
import Departure from '../Entities/Departure';
import Stock from '../Entities/Stock';
import Product from '../Entities/Product';
import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';
import EntityNotFoundException from '../../Application/Exceptions/EntityNotFoundException';

@injectable()
export default class StockDepartureService {
  private stockDepartureRepository: IStockDepartureRepository;
  private stockRepository: IStockRepository;

  public constructor(
    @inject(INTERFACES.IStockDepartureRepository) stockDepartureRepository: IStockDepartureRepository,
    @inject(INTERFACES.IStockRepository) stockRepository: IStockRepository,
  ) {
    this.stockDepartureRepository = stockDepartureRepository;
    this.stockRepository = stockRepository;
  }

  public async setStockDeparture(departure: Departure, product: Product, quantity: number): Promise<void> {
    const stock = await this.stockRepository.findOneByStockProduct(product.getId());
    if (stock) {
      const actualQuantity = stock.getQuantity();
      stock.setQuantity(actualQuantity - quantity);
      const stockDeparture = new StockDeparture(stock, departure);
      await this.stockDepartureRepository.persist(stockDeparture);
      await this.stockRepository.persist(stock);
    } else {
      throw new EntityNotFoundException(`Stock with product: ${product.getName()} not found`);
    }
  }

  public async destroyStockEntriesFromDeparture(departureId: number): Promise<void> {
    const stockEntries = await this.stockDepartureRepository.findByDepartureId(departureId);
    for (const stockDeparture of stockEntries) {
      try {
        await this.stockDepartureRepository.destroy(stockDeparture);
      } catch (e) {
        throw new CannotDeleteEntity(`StockDeparture with id: ${stockDeparture.getId()} could not be deleted`);
      }
    }
  }

  public async updateQuantityStock(product: Product, quantity: number): Promise<void> {
    const stock = await this.stockRepository.findOneByStockProduct(product.getId());
    const actualQuantity = stock.getQuantity();
    stock.setQuantity(actualQuantity + quantity);
    await this.stockRepository.persist(stock);
  }

  public async newStockDeparture(departure: Departure, stock: Stock): Promise<void> {
    await this.stockDepartureRepository.persist(new StockDeparture(stock, departure));
  }
}

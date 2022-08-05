import { inject, injectable } from 'inversify';
import IStockDepartureRepository from '../Interfaces/IStockDepartureRepository';
import IStockRepository from '../Interfaces/IStockRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import StockDeparture from '../Entities/StockDeparture';
import Departure from '../Entities/Departure';
import Stock from '../Entities/Stock';
import Product from '../Entities/Product';
import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';

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
    let stock = await this.stockRepository.findOneByStockProduct(product.getId());
    if (!stock) {
      stock = await this.stockRepository.persist(new Stock(product, -quantity));
    } else {
      const actualQuantity = stock.getQuantity();
      stock.setQuantity(actualQuantity - quantity);
    }
    const stockDeparture = new StockDeparture(stock, departure);
    await this.stockDepartureRepository.persist(stockDeparture);
    await this.stockRepository.persist(stock);
  }

  public async destroyStockDeparturesFromDeparture(departureId: number): Promise<void> {
    const stockDepartures = await this.stockDepartureRepository.findByDepartureId(departureId);
    for (const stockDeparture of stockDepartures) {
      try {
        await this.stockDepartureRepository.destroy(stockDeparture);
      } catch (e) {
        throw new CannotDeleteEntity(`No se pudo borrar la salida-stock con id: ${stockDeparture.getId()}`);
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

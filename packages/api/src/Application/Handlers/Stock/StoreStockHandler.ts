import IStockRepository from '../../../Domain/Interfaces/IStockRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreStockCommand from '../../Commands/Stock/StoreStockCommand';
import Stock from '../../../Domain/Entities/Stock';
import StockEntryService from '../../../Domain/Services/StockEntryService';

@injectable()
export default class StoreStockHandler {
  private stockRepository: IStockRepository;
  private stockEntryService: StockEntryService;
  public constructor(
    @inject(INTERFACES.IStockRepository) stockRepository: IStockRepository,
    @inject(StockEntryService) stockEntryService: StockEntryService,
  ) {
    this.stockRepository = stockRepository;
    this.stockEntryService = stockEntryService;
  }

  public async execute(command: StoreStockCommand): Promise<Stock> {
    const stock = new Stock(command.getProduct(), command.getQuantity(), command.getMinimunQuantity());
    return this.stockEntryService.setStockEntryToStock(await this.stockRepository.persist(stock));
  }
}

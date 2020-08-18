import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IStockRepository from '../Interfaces/IStockRepository';
import IEntryRepository from '../Interfaces/IEntryRepository';
import Stock from '../Entities/Stock';
import UpdateStockCommand from '../../Application/Commands/Stock/UpdateStockCommand';
import Entry from '../Entities/Entry';
import StockEntryService from './StockEntryService';
import Departure from '../Entities/Departure';
import IDepartureRepository from '../Interfaces/IDepartureRepository';
import StockDepartureService from './StockDepartureService';

@injectable()
export default class StockService {
  private stockRepository: IStockRepository;
  private entryRepository: IEntryRepository;
  private departureRepository: IDepartureRepository;
  private stockEntryService: StockEntryService;
  private stockDepartureService: StockDepartureService;

  public constructor(
    @inject(INTERFACES.IStockRepository) stockRepository: IStockRepository,
    @inject(INTERFACES.IEntryRepository) entryRepository: IEntryRepository,
    @inject(INTERFACES.IDepartureRepository) departureRepository: IDepartureRepository,
    @inject(StockEntryService) stockEntryService: StockEntryService,
    @inject(StockDepartureService) stockDepartureService: StockDepartureService,
  ) {
    this.stockRepository = stockRepository;
    this.entryRepository = entryRepository;
    this.departureRepository = departureRepository;
    this.stockEntryService = stockEntryService;
    this.stockDepartureService = stockDepartureService;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const stockQuantity = await this.stockRepository.count();
    const stocks = await this.stockRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: stocks,
      dataLength: stocks.length,
      totalDataQuantity: stockQuantity,
      totalPages: Math.ceil(stockQuantity / itemsPerPage),
    };
  }

  public async updateStock(stock: Stock, command: UpdateStockCommand): Promise<Stock> {
    if (stock.getQuantity() !== command.getQuantity()) {
      if (stock.getQuantity() < command.getQuantity()) {
        const date: Date = new Date(Date.now());
        const entry = new Entry(date.toISOString(), `Ajuste de stock, producto: ${stock.getProduct().getName()}`);
        stock.setQuantity(command.getQuantity());
        stock.setMinimunQuantity(command.getMinimunQuantity());
        await this.entryRepository.persist(entry);
        await this.stockRepository.persist(stock);
        await this.stockEntryService.newStockEntry(entry, stock);
      } else {
        const date: Date = new Date(Date.now());
        const departure = new Departure(
          date.toISOString(),
          `Ajuste de stock, producto: ${stock.getProduct().getName()}`,
        );
        stock.setQuantity(command.getQuantity());
        stock.setMinimunQuantity(command.getMinimunQuantity());
        await this.departureRepository.persist(departure);
        await this.stockRepository.persist(stock);
        await this.stockDepartureService.newStockDeparture(departure, stock);
      }
    } else {
      stock.setMinimunQuantity(command.getMinimunQuantity());
      await this.stockRepository.persist(stock);
    }
    return stock;
  }
}

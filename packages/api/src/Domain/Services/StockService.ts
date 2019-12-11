import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IStockRepository from '../Interfaces/IStockRepository';
import IEntryRepository from '../Interfaces/IEntryRepository';
import Stock from '../Entities/Stock';
import UpdateStockCommand from '../../Application/Commands/Stock/UpdateStockCommand';
import Entry from '../Entities/Entry';
import StockEntryService from './StockEntryService';


@injectable()
export default class StockService {
  private stockRepository: IStockRepository;
  private entryRepository: IEntryRepository;
  private stockEntryService: StockEntryService;

  public constructor(
    @inject(INTERFACES.IStockRepository) stockRepository: IStockRepository,
    @inject(INTERFACES.IEntryRepository) entryRepository: IEntryRepository,
    @inject(StockEntryService) stockEntryService: StockEntryService,
  ) {
    this.stockRepository = stockRepository;
    this.entryRepository = entryRepository;
    this.stockEntryService = stockEntryService;
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

  public async updateStock(stock: Stock, command: UpdateStockCommand): Promise<Stock>{
    if(stock.getQuantity() !== command.getQuantity()){
      if(stock.getQuantity() < command.getQuantity()){
        const date = Date.now();
        const entry = new Entry(date.toString(),`Ajuste de stock, producto: ${stock.getProduct()}`);
        stock.setQuantity(command.getQuantity());
        stock.setMinimunQuantity(command.getMinimunQuantity());
        await this.entryRepository.persist(entry);
        await this.stockRepository.persist(stock);
        await this.stockEntryService.newStockEntry(entry, stock);
      }
    }
    else{
      stock.setMinimunQuantity(command.getMinimunQuantity());
      await this.stockRepository.persist(stock);
    }
    return stock;
  }
}

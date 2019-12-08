import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IStockRepository from '../Interfaces/IStockRepository';

@injectable()
export default class StockService {
  private stockRepository: IStockRepository;

  public constructor(@inject(INTERFACES.IStockRepository) stockRepository: IStockRepository) {
    this.stockRepository = stockRepository;
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
}

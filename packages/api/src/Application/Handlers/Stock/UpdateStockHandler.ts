import IStockRepository from '../../../Domain/Interfaces/IStockRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateStockCommand from '../../Commands/Stock/UpdateStockCommand';
import Stock from '../../../Domain/Entities/Stock';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import StockService from '../../../Domain/Services/StockService';

@injectable()
export default class UpdateUserHandler {
  private stockRepository: IStockRepository;
  private stockService: StockService;
  public constructor(
    @inject(INTERFACES.IStockRepository) stockRepository: IStockRepository,
    @inject(StockService) stockService: StockService,
  ) {
    this.stockRepository = stockRepository;
    this.stockService = stockService;
  }

  public async execute(command: UpdateStockCommand): Promise<Stock> {
    const stock = await this.stockRepository.findOneById(command.getId());
    if (!stock) {
      throw new EntityNotFoundException(`Stock with id: ${command.getId()} not found`);
    }
    return await this.stockService.updateStock(stock, command);
  }
}

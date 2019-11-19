import IStockRepository from '../../../Domain/Interfaces/IStockRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreStockCommand from '../../Commands/Stock/StoreStockCommand';
import Stock from '../../../Domain/Entities/Stock';

@injectable()
export default class StoreStockHandler {
  private stockRepository: IStockRepository;

  public constructor(@inject(INTERFACES.IStockRepository) stockRepository: IStockRepository) {
    this.stockRepository = stockRepository;
  }

  public async execute(command: StoreStockCommand): Promise<Stock> {
    const stock = new Stock(command.getProduct(), command.getQuantity(), command.getMinimunQuantity());
    return await this.stockRepository.persist(stock);
  }
}

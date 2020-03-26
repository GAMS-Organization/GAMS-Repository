import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IStockDepartureRepository from '../../../Domain/Interfaces/IStockDepartureRepository';
import StockDeparture from '../../../Domain/Entities/StockDeparture';

@injectable()
export default class TypeStockDepartureRepository extends TypeRepository implements IStockDepartureRepository {
  public async findAll(): Promise<StockDeparture[]> {
    return await this.repository(StockDeparture).find();
  }

  public async findOneById(id: number): Promise<StockDeparture> {
    return await this.repository(StockDeparture).findOne(id);
  }

  public async findByDepartureId(id: number): Promise<StockDeparture[]> {
    return await this.repository(StockDeparture).find({ where: { departure: id }, relations: ['stock', 'departure'] });
  }

  public async findByStockId(id: number): Promise<StockDeparture[]> {
    return await this.repository(StockDeparture).find({ where: { stock: id }, relations: ['stock', 'departure'] });
  }

  public async persist(stockDeparture: StockDeparture): Promise<StockDeparture> {
    return await this.repository(StockDeparture).save(stockDeparture);
  }

  public async destroy(stockDeparture: StockDeparture): Promise<boolean> {
    const result = await this.repository(StockDeparture).delete(stockDeparture.getId());

    return result && result.affected === 1;
  }
}

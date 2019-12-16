import StockDeparture from '../Entities/StockDeparture';

export default interface IStockDepartureRepository {
  findAll(): Promise<StockDeparture[]>;
  findOneById(id: number): Promise<StockDeparture>;
  findByDepartureId(departureId: number): Promise<StockDeparture[]>;
  findByStockId(stockId: number): Promise<StockDeparture[]>;
  persist(userRole: StockDeparture): Promise<StockDeparture>;
  destroy(userRol: StockDeparture): Promise<boolean>;
}

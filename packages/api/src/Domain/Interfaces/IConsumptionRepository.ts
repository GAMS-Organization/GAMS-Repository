import Consumption from '../Entities/Consumption';

export default interface IConsumptionRepository {
  findAll(): Promise<Consumption[]>;
  findOneById(id: number): Promise<Consumption>;
  findByProductName(id: number): Promise<Consumption[]>;
  findByDepartureId(id: number): Promise<Consumption[]>;
  // findByWorkOrderId(id: number): Promise<Consumption[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Consumption[]>;
  count(): Promise<number>;
  persist(consumption: Consumption): Promise<Consumption>;
  destroy(consumption: Consumption): Promise<boolean>;
}

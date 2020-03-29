import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IConsumptionRepository from '../../../Domain/Interfaces/IConsumptionRepository';
import Consumption from '../../../Domain/Entities/Consumption';

@injectable()
export default class TypeConsumptionRepository extends TypeRepository implements IConsumptionRepository {
  public async findAll(): Promise<Consumption[]> {
    return await this.repository(Consumption).find({ relations: ['departure', 'product'] });
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Consumption[]> {
    return await this.repository(Consumption).find({
      skip: initialIndex,
      take: limit,
      relations: ['departure', 'product'],
    });
  }

  public async count(): Promise<number> {
    return await this.repository(Consumption).count();
  }

  public async findOneById(id: number): Promise<Consumption> {
    return await this.repository(Consumption).findOne(id);
  }

  public async findByDepartureId(id: number): Promise<Consumption[]> {
    return await this.repository(Consumption).find({ where: { departure: id }, relations: ['departure', 'product'] });
  }

  public async findByProductName(id: number): Promise<Consumption[]> {
    return await this.repository(Consumption).find({ where: { product: id }, relations: ['departure', 'product'] });
  }

  public async persist(consumption: Consumption): Promise<Consumption> {
    return await this.repository(Consumption).save(consumption);
  }

  public async destroy(consumption: Consumption): Promise<boolean> {
    const result = await this.repository(Consumption).delete(consumption.getId());

    return result && result.affected === 1;
  }
}

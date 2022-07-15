import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import Departure from '../../../Domain/Entities/Departure';
import IDepartureRepository from '../../../Domain/Interfaces/IDepartureRepository';

@injectable()
export default class TypeDepartureRepository extends TypeRepository implements IDepartureRepository {
  public async findAll(): Promise<Departure[]> {
    return await this.repository(Departure).find({ relations: ['consumptions', 'consumptions.product', 'workOrder'] });
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Departure[]> {
    return await this.repository(Departure).find({
      skip: initialIndex,
      take: limit,
      relations: ['consumptions', 'consumptions.product', 'workOrder'],
      order: {
        date: 'DESC',
      },
    });
  }

  public async count(): Promise<number> {
    return await this.repository(Departure).count();
  }

  public async findOneById(id: number): Promise<Departure> {
    return await this.repository(Departure).findOne({
      where: { id: id },
      relations: ['consumptions', 'consumptions.product', 'workOrder'],
    });
  }

  public async findByProductName(id: number): Promise<Departure[]> {
    return await this.repository(Departure).find({ where: { product: id } });
  }

  public async persist(departure: Departure): Promise<Departure> {
    return await this.repository(Departure).save(departure);
  }

  public async destroy(departure: Departure): Promise<boolean> {
    const result = await this.repository(Departure).delete(departure.getId());

    return result && result.affected === 1;
  }
}

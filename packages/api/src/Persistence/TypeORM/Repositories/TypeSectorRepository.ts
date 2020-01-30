import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import ISectorRepository from '../../../Domain/Interfaces/ISectorRepository';
import Sector from '../../../Domain/Entities/Sector';

@injectable()
export default class TypeSectorRepository extends TypeRepository implements ISectorRepository {
  public async findAll(): Promise<Sector[]> {
    return await this.repository(Sector).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Sector[]> {
    return await this.repository(Sector).find({ skip: initialIndex, take: limit });
  }

  public async count(): Promise<number> {
    return await this.repository(Sector).count();
  }

  public async findOneById(id: number): Promise<Sector> {
    return await this.repository(Sector).findOne(id);
  }

  public async findByAssetId(id: number): Promise<Sector> {
    return await this.repository(Sector).findOne({ where: { asset: id }, relations: ['asset'] });
  }

  public async findOneBySectorName(name: string): Promise<Sector> {
    return await this.repository(Sector).findOne({ where: { name: name } });
  }

  public async persist(sector: Sector): Promise<Sector> {
    return await this.repository(Sector).save(sector);
  }

  public async destroy(sector: Sector): Promise<boolean> {
    const result = await this.repository(Sector).delete(sector.getId());

    return result && result.affected === 1;
  }
}

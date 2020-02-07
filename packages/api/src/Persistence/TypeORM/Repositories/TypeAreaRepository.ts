import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import Area from '../../../Domain/Entities/Area';

@injectable()
export default class TypeAreaRepository extends TypeRepository implements IAreaRepository {
  public async findAll(): Promise<Area[]> {
    return await this.repository(Area).find({ relations: ['sector'] });
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Area[]> {
    return await this.repository(Area).find({ skip: initialIndex, take: limit , relations:['sector']});
  }

  public async count(): Promise<number> {
    return await this.repository(Area).count();
  }

  public async findOneById(id: number): Promise<Area> {
    return await this.repository(Area).findOne(id);
  }

  public async findByAssetId(id: number): Promise<Area> {
    return await this.repository(Area).findOne({ where: { asset: id }, relations: ['asset'] });
  }

  public async findBySectorId(id: number): Promise<Area[]> {
    return await this.repository(Area).find({ where: { sector: id }, relations: ['sector'] });
  }

  public async findOneByAreaName(name: string, sector: number): Promise<Area> {
    return await this.repository(Area).findOne({ where: { name: name, sector: sector } });
  }

  public async persist(area: Area): Promise<Area> {
    return await this.repository(Area).save(area);
  }

  public async destroy(area: Area): Promise<boolean> {
    const result = await this.repository(Area).delete(area.getId());

    return result && result.affected === 1;
  }
}

import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import AreaService from '../../../Domain/Entities/AreaService';
import IAreaServiceRepository from '../../../Domain/Interfaces/IAreaServiceRepository';

@injectable()
export default class TypeAreaServiceRepository extends TypeRepository implements IAreaServiceRepository {
  public async findAll(): Promise<AreaService[]> {
    return await this.repository(AreaService).find({ relations: ['area', 'service'] });
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<AreaService[]> {
    return await this.repository(AreaService).find({
      skip: initialIndex,
      take: limit,
      relations: ['area', 'service'],
    });
  }

  public async count(): Promise<number> {
    return await this.repository(AreaService).count();
  }

  public async findOneById(id: number): Promise<AreaService> {
    return await this.repository(AreaService).findOne(id);
  }

  public async findByServiceName(id: number): Promise<AreaService[]> {
    return await this.repository(AreaService).find({ where: { service: id }, relations: ['area', 'service'] });
  }

  public async findByAreaName(id: number): Promise<AreaService[]> {
    return await this.repository(AreaService).find({ where: { area: id }, relations: ['area', 'service'] });
  }

  public async persist(areaService: AreaService): Promise<AreaService> {
    return await this.repository(AreaService).save(areaService);
  }

  public async destroy(areaService: AreaService): Promise<boolean> {
    const result = await this.repository(AreaService).delete(areaService.getId());

    return result && result.affected === 1;
  }
}

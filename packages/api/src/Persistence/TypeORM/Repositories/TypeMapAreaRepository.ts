import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IMapAreaRepository from '../../../Domain/Interfaces/IMapAreaRepository';
import MapArea from '../../../Domain/Entities/MapArea';

@injectable()
export default class TypeMapAreaRepository extends TypeRepository implements IMapAreaRepository {
  public async findAll(): Promise<MapArea[]> {
    return await this.repository(MapArea).find();
  }

  public async findOneById(id: number): Promise<MapArea> {
    return await this.repository(MapArea).findOne(id);
  }

  public async persist(mapArea: MapArea): Promise<MapArea> {
    return await this.repository(MapArea).save(mapArea);
  }

  public async destroy(mapArea: MapArea): Promise<boolean> {
    const result = await this.repository(MapArea).delete(mapArea.getId());

    return result && result.affected === 1;
  }
}

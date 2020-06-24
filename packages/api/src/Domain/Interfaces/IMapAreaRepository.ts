import MapArea from '../Entities/MapArea';

export default interface IMapAreaRepository {
  findAll(): Promise<MapArea[]>;
  findOneById(id: number): Promise<MapArea>;
  persist(mapArea: MapArea): Promise<MapArea>;
  destroy(mapArea: MapArea): Promise<boolean>;
}

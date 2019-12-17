import Area from '../Entities/Area';

export default interface IAreaRepository {
  findAll(): Promise<Area[]>;
  findOneById(id: number): Promise<Area>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Area[]>;
  count(): Promise<number>;
  findByAssetId(id: number): Promise<Area[]>;
  persist(area: Area): Promise<Area>;
  destroy(area: Area): Promise<boolean>;
}

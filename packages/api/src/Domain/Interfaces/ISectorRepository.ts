import Sector from '../Entities/Sector';

export default interface ISectorRepository {
  findAll(): Promise<Sector[]>;
  findOneById(id: number): Promise<Sector>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Sector[]>;
  count(): Promise<number>;
  findByAssetId(id: number): Promise<Sector[]>;
  persist(sector: Sector): Promise<Sector>;
  destroy(sector: Sector): Promise<boolean>;
}

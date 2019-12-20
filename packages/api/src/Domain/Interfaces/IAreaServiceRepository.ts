import AreaService from '../Entities/AreaService';

export default interface IAreaServiceRepository {
  findAll(): Promise<AreaService[]>;
  findOneById(id: number): Promise<AreaService>;
  findByAreaName(id: number): Promise<AreaService[]>;
  findByServiceName(id: number): Promise<AreaService[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<AreaService[]>;
  count(): Promise<number>;
  persist(areaService: AreaService): Promise<AreaService>;
  destroy(areaService: AreaService): Promise<boolean>;
}

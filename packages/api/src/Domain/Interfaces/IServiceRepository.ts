import Service from '../Entities/Service';

export default interface IServiceRepository {
  findAll(): Promise<Service[]>;
  findOneById(id: number): Promise<Service>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Service[]>;
  count(): Promise<number>;
  findByAssetId(id: number): Promise<Service[]>;
  persist(service: Service): Promise<Service>;
  destroy(service: Service): Promise<boolean>;
}

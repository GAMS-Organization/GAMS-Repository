import Asset from '../Entities/Asset';

export default interface IAssetRepository {
  findAll(): Promise<Asset[]>;
  findOneById(id: number): Promise<Asset>;
  findOneByCode(code: string): Promise<Asset>;
  findBySectorId(id: number): Promise<Asset[]>;
  findByAreaId(id: number): Promise<Asset[]>;
  findByServiceId(id: number): Promise<Asset[]>;
  findByElementId(id: number): Promise<Asset[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Asset[]>;
  count(): Promise<number>;
  findByWorkOrderId(workOrderId: number): Promise<Asset>;
  persist(asset: Asset): Promise<Asset>;
  destroy(asset: Asset): Promise<boolean>;
}

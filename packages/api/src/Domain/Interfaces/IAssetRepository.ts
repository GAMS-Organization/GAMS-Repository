import Asset from '../Entities/Asset';

export default interface IAssetRepository {
  findAll(): Promise<Asset[]>;
  findOneById(id: number): Promise<Asset>;
  findOneByCode(code: string): Promise<Asset>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Asset[]>;
  count(): Promise<number>;
  findByWorkOrderId(workOrderId: number): Promise<Asset>;
  persist(asset: Asset): Promise<Asset>;
  destroy(asset: Asset): Promise<boolean>;
}

import Asset from '../Entities/Asset';

export default interface IAssetRepository{
  findAll(): Promise<Asset[]>;
  findOneById(id: number): Promise<Asset>;
  findByWorkOrderId(workOrderId: number): Promise<Asset[]>;
  persist(asset: Asset): Promise<Asset>;
  destroy(asset: Asset): Promise<boolean>;
}
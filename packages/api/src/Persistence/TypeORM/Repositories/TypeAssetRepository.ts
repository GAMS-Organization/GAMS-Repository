import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IAssetRepository from '../../../Domain/Interfaces/IAssetRepository';
import Asset from '../../../Domain/Entities/Asset';

@injectable()
export default class TypeAssetRepository extends TypeRepository implements IAssetRepository {
  public async findAll(): Promise<Asset[]> {
    return await this.repository(Asset).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Asset[]> {
    return await this.repository(Asset).find({ skip: initialIndex, take: limit, relations: ['sector', 'area', 'service', 'element']});
  }

  public async count(): Promise<number> {
    return await this.repository(Asset).count();
  }

  public async findOneById(id: number): Promise<Asset> {
    return await this.repository(Asset).findOne(id);
  }

  public async findOneByCode(code: string): Promise<Asset> {
    return await this.repository(Asset).findOne({where: {code}});
  }

  public async findByWorkOrderId(id: number): Promise<Asset> {
    return await this.repository(Asset).findOne({ where: { workOrder: id }, relations: ['workOrder'] });
  }

  public async persist(asset: Asset): Promise<Asset> {
    return await this.repository(Asset).save(asset);
  }

  public async destroy(asset: Asset): Promise<boolean> {
    const result = await this.repository(Asset).delete(asset.getId());

    return result && result.affected === 1;
  }
}

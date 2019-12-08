import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IPurchaseRepository from '../../../Domain/Interfaces/IPurchaseRepository';
import Purchase from '../../../Domain/Entities/Purchase';

@injectable()
export default class TypePurchaseRepository extends TypeRepository implements IPurchaseRepository {
  public async findAll(): Promise<Purchase[]> {
    return await this.repository(Purchase).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Purchase[]> {
    return await this.repository(Purchase).find({ skip: initialIndex, take: limit });
  }

  public async count(): Promise<number> {
    return await this.repository(Purchase).count();
  }

  public async findOneById(id: number): Promise<Purchase> {
    return await this.repository(Purchase).findOne(id);
  }

  public async findByEntryId(id: number): Promise<Purchase[]> {
    return await this.repository(Purchase).find({ where: { entry: id } , relations:['entry', 'product']});
  }

  public async findByProductName(id: number): Promise<Purchase[]> {
    return await this.repository(Purchase).find({ where: { product: id }, relations: ['entry','product'] });
  }

  public async persist(purchase: Purchase): Promise<Purchase> {
    return await this.repository(Purchase).save(purchase);
  }

  public async destroy(purchase: Purchase): Promise<boolean> {
    const result = await this.repository(Purchase).delete(purchase.getId());

    return result && result.affected === 1;
  }
}

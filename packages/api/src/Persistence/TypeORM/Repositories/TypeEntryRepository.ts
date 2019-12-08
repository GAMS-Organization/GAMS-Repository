import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import Entry from '../../../Domain/Entities/Entry';
import IEntryRepository from '../../../Domain/Interfaces/IEntryRepository';

@injectable()
export default class TypeEntryRepository extends TypeRepository implements IEntryRepository {
  public async findAll(): Promise<Entry[]> {
    return await this.repository(Entry).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Entry[]> {
    return await this.repository(Entry).find({ skip: initialIndex, take: limit });
  }

  public async count(): Promise<number> {
    return await this.repository(Entry).count();
  }

  public async findOneById(id: number): Promise<Entry> {
    return await this.repository(Entry).findOne(id);
  }

  public async findByProductName(product: string): Promise<Entry[]> {
    return await this.repository(Entry).find({ where: { product: product } });
  }

  public async persist(entry: Entry): Promise<Entry> {
    return await this.repository(Entry).save(entry);
  }

  public async destroy(entry: Entry): Promise<boolean> {
    const result = await this.repository(Entry).delete(entry.getId());

    return result && result.affected === 1;
  }
}

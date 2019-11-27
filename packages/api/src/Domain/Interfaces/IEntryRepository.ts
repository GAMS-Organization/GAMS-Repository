import Entry from '../Entities/Entry';

export default interface IEntryRepository {
  findAll(): Promise<Entry[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Entry[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<Entry>;
  findByProductName(product: string): Promise<Entry[]>;
  persist(entry: Entry): Promise<Entry>;
  destroy(entry: Entry): Promise<boolean>;
}

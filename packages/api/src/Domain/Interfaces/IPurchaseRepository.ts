import Purchase from '../Entities/Purchase';

export default interface IPurchaseRepository {
  findAll(): Promise<Purchase[]>;
  findOneById(id: number): Promise<Purchase>;
  findByProductName(id: number): Promise<Purchase[]>;
  findByEntryId(id: number): Promise<Purchase[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Purchase[]>;
  count(): Promise<number>;
  persist(purchase: Purchase): Promise<Purchase>;
  destroy(purchase: Purchase): Promise<boolean>;
}

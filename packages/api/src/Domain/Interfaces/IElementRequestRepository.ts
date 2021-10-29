import ElementRequest from '../Entities/ElementRequest';

export default interface IElementRequestRepository {
  findAll(): Promise<ElementRequest[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<ElementRequest[]>;
  count(): Promise<number>;
  countByUserId(userId: number): Promise<number>;
  findByUserId(userId: number, initialIndex: number, limit: number): Promise<ElementRequest[]>;
  findOneById(id: number): Promise<ElementRequest>;
  findOneByElementRequestName(name: string): Promise<ElementRequest>;
  persist(elementRequest: ElementRequest): Promise<ElementRequest>;
  destroy(elementRequest: ElementRequest): Promise<boolean>;
}

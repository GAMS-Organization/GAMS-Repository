import ElementRequest from '../Entities/ElementRequest';

export default interface IElementRequestRepository {
  findAll(): Promise<ElementRequest[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<ElementRequest[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<ElementRequest>;
  findOneByElementRequestName(name: string): Promise<ElementRequest>;
  persist(elementRequest: ElementRequest): Promise<ElementRequest>;
  destroy(elementRequest: ElementRequest): Promise<boolean>;
}

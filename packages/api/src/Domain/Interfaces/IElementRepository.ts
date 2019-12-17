import Element from '../Entities/Element';

export default interface IElementRepository {
  findAll(): Promise<Element[]>;
  findOneById(id: number): Promise<Element>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Element[]>;
  count(): Promise<number>;
  findByAssetId(id: number): Promise<Element[]>;
  persist(element: Element): Promise<Element>;
  destroy(element: Element): Promise<boolean>;
}

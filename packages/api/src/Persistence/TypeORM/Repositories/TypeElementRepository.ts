import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';
import IElementRepository from '../../../Domain/Interfaces/IElementRepository';
import Element from '../../../Domain/Entities/Element';

@injectable()
export default class TypeElementRepository extends TypeRepository implements IElementRepository {
  public async findAll(): Promise<Element[]> {
    return await this.repository(Element).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Element[]> {
    return await this.repository(Element).find({ skip: initialIndex, take: limit });
  }

  public async count(): Promise<number> {
    return await this.repository(Element).count();
  }

  public async findOneById(id: number): Promise<Element> {
    return await this.repository(Element).findOne(id);
  }

  public async findByAssetId(id: number): Promise<Element[]> {
    return await this.repository(Element).findOne({ where: { asset: id }, relations: ['asset'] });
  }

  public async findOneByElementName(name: string): Promise<Element> {
    return await this.repository(Element).findOne({ where: { name: name } });
  }

  public async persist(element: Element): Promise<Element> {
    return await this.repository(Element).save(element);
  }

  public async destroy(element: Element): Promise<boolean> {
    const result = await this.repository(Element).delete(element.getId());

    return result && result.affected === 1;
  }
}

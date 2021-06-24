import IElementRequestRepository from '../../../Domain/Interfaces/IElementRequestRepository';
import ElementRequest from '../../../Domain/Entities/ElementRequest';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeElementRequestRepository extends TypeRepository implements IElementRequestRepository {
  public async findAll(): Promise<ElementRequest[]> {
    return await this.repository(ElementRequest).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<ElementRequest[]> {
    return await this.repository(ElementRequest).find({
      skip: initialIndex,
      take: limit,
      relations: ['area', 'element', 'user'],
    });
  }

  public async findOneById(id: number): Promise<ElementRequest> {
    return await this.repository(ElementRequest).findOne({
      where: { id: id },
      relations: ['area', 'element', 'user'],
    });
  }

  public async count(): Promise<number> {
    return await this.repository(ElementRequest).count();
  }

  public async findOneByElementRequestName(name: string): Promise<ElementRequest> {
    return await this.repository(ElementRequest).findOne({ where: { name: name } });
  }

  public async persist(elementRequest: ElementRequest): Promise<ElementRequest> {
    return await this.repository(ElementRequest).save(elementRequest);
  }

  public async destroy(elementRequest: ElementRequest): Promise<boolean> {
    const result = await this.repository(ElementRequest).delete(elementRequest.getId());

    return result && result.affected === 1;
  }
}

import IToolRequestRepository from '../../../Domain/Interfaces/IToolRequestRepository';
import ToolRequest from '../../../Domain/Entities/ToolRequest';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeToolRequestRepository extends TypeRepository implements IToolRequestRepository {
  public async findAll(): Promise<ToolRequest[]> {
    return await this.repository(ToolRequest).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<ToolRequest[]> {
    return await this.repository(ToolRequest).find({
      skip: initialIndex,
      take: limit,
      relations: ['area', 'tool', 'user'],
    });
  }

  public async findOneById(id: number): Promise<ToolRequest> {
    return await this.repository(ToolRequest).findOne({
      where: { id: id },
      relations: ['area', 'tool', 'user'],
    });
  }

  public async count(): Promise<number> {
    return await this.repository(ToolRequest).count();
  }

  public async findOneByToolRequestName(name: string): Promise<ToolRequest> {
    return await this.repository(ToolRequest).findOne({ where: { name: name } });
  }

  public async persist(toolRequest: ToolRequest): Promise<ToolRequest> {
    return await this.repository(ToolRequest).save(toolRequest);
  }

  public async destroy(toolRequest: ToolRequest): Promise<boolean> {
    const result = await this.repository(ToolRequest).delete(toolRequest.getId());

    return result && result.affected === 1;
  }
}

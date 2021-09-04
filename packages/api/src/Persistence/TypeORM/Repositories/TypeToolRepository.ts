import IToolRepository from '../../../Domain/Interfaces/IToolRepository';
import Tool from '../../../Domain/Entities/Tool';
import { injectable } from 'inversify';
import TypeRepository from './TypeRepository';

@injectable()
export default class TypeToolRepository extends TypeRepository implements IToolRepository {
  public async findAll(): Promise<Tool[]> {
    return await this.repository(Tool).find();
  }

  public async findAllPaginated(initialIndex: number, limit: number): Promise<Tool[]> {
    return await this.repository(Tool).find({ skip: initialIndex, take: limit });
  }

  public async findOneById(id: number): Promise<Tool> {
    return await this.repository(Tool).findOne(id);
  }

  public async count(): Promise<number> {
    return await this.repository(Tool).count();
  }

  public async findOneByToolName(name: string): Promise<Tool> {
    return await this.repository(Tool).findOne({ where: { name: name } });
  }

  public async persist(tool: Tool): Promise<Tool> {
    return await this.repository(Tool).save(tool);
  }

  public async destroy(tool: Tool): Promise<boolean> {
    const result = await this.repository(Tool).delete(tool.getId());

    return result && result.affected === 1;
  }
}

import Tool from '../Entities/Tool';

export default interface IToolRepository {
  findAll(): Promise<Tool[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<Tool[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<Tool>;
  findOneByToolName(name: string): Promise<Tool>;
  persist(tool: Tool): Promise<Tool>;
  destroy(tool: Tool): Promise<boolean>;
}

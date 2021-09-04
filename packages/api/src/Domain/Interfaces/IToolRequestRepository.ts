import ToolRequest from '../Entities/ToolRequest';

export default interface IToolRequestRepository {
  findAll(): Promise<ToolRequest[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<ToolRequest[]>;
  count(): Promise<number>;
  findOneById(id: number): Promise<ToolRequest>;
  findOneByToolRequestName(name: string): Promise<ToolRequest>;
  persist(toolRequest: ToolRequest): Promise<ToolRequest>;
  destroy(toolRequest: ToolRequest): Promise<boolean>;
}

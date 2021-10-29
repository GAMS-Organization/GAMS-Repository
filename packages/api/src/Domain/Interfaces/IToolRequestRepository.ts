import ToolRequest from '../Entities/ToolRequest';

export default interface IToolRequestRepository {
  findAll(): Promise<ToolRequest[]>;
  findAllPaginated(initialIndex: number, limit: number): Promise<ToolRequest[]>;
  count(): Promise<number>;
  countByUserId(userId: number): Promise<number>;
  findByUserId(userId: number, initialIndex: number, limit: number): Promise<ToolRequest[]>;
  findOneById(id: number): Promise<ToolRequest>;
  findOneByToolRequestName(name: string): Promise<ToolRequest>;
  persist(toolRequest: ToolRequest): Promise<ToolRequest>;
  destroy(toolRequest: ToolRequest): Promise<boolean>;
}

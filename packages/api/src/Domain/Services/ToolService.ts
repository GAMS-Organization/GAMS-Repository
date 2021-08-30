import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IToolRepository from '../Interfaces/IToolRepository';
import Tool from '../Entities/Tool';
import EntityNotFoundException from '../../Application/Exceptions/EntityNotFoundException';

@injectable()
export default class ToolService {
  private toolRepository: IToolRepository;

  public constructor(@inject(INTERFACES.IToolRepository) toolRepository: IToolRepository) {
    this.toolRepository = toolRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const toolQuantity = await this.toolRepository.count();
    const tools = await this.toolRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: tools,
      dataLength: tools.length,
      totalDataQuantity: toolQuantity,
      totalPages: Math.ceil(toolQuantity / itemsPerPage),
    };
  }

  public async updateQuantity(quantity: number, tool: Tool, type: 'borrow' | 'return'): Promise<Tool> {
    const totalQuantity = tool.getTotalQuantity();
    const borrowedQuantity = tool.getBorrowQuantity();
    if (type === 'borrow') {
      const available = totalQuantity - borrowedQuantity;
      if (quantity > available) {
        throw new EntityNotFoundException('The amount requested is bigger than the available amount');
      }
      tool.setBorrowQuantity(borrowedQuantity + quantity);
    } else {
      if (borrowedQuantity - quantity < 0) {
        tool.setBorrowQuantity(0);
      } else {
        tool.setBorrowQuantity(borrowedQuantity - quantity);
      }
    }
    return this.toolRepository.persist(tool);
  }
}

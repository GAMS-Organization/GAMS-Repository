import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IToolRequestRepository from '../Interfaces/IToolRequestRepository';

@injectable()
export default class ToolRequestService {
  private toolRequestRepository: IToolRequestRepository;

  public constructor(@inject(INTERFACES.IToolRequestRepository) toolRequestRepository: IToolRequestRepository) {
    this.toolRequestRepository = toolRequestRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const toolRequestQuantity = await this.toolRequestRepository.count();
    const toolRequests = await this.toolRequestRepository.findAllPaginated(
      itemsPerPage * page - itemsPerPage,
      itemsPerPage,
    );
    return {
      data: toolRequests,
      dataLength: toolRequests.length,
      totalDataQuantity: toolRequestQuantity,
      totalPages: Math.ceil(toolRequestQuantity / itemsPerPage),
    };
  }

  public async returnAllPaginatedByAuthor(
    userId: number,
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const toolRequestQuantity = await this.toolRequestRepository.countByUserId(userId);
    const toolRequests = await this.toolRequestRepository.findByUserId(
      userId,
      itemsPerPage * page - itemsPerPage,
      itemsPerPage,
    );
    return {
      data: toolRequests,
      dataLength: toolRequests.length,
      totalDataQuantity: toolRequestQuantity,
      totalPages: Math.ceil(toolRequestQuantity / itemsPerPage),
    };
  }
}

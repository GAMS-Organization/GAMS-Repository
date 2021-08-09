import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IElementRequestRepository from '../Interfaces/IElementRequestRepository';

@injectable()
export default class ElementRequestService {
  private elementRequestRepository: IElementRequestRepository;

  public constructor(
    @inject(INTERFACES.IElementRequestRepository) elementRequestRepository: IElementRequestRepository,
  ) {
    this.elementRequestRepository = elementRequestRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const elementRequestQuantity = await this.elementRequestRepository.count();
    const elementRequests = await this.elementRequestRepository.findAllPaginated(
      itemsPerPage * page - itemsPerPage,
      itemsPerPage,
    );
    return {
      data: elementRequests,
      dataLength: elementRequests.length,
      totalDataQuantity: elementRequestQuantity,
      totalPages: Math.ceil(elementRequestQuantity / itemsPerPage),
    };
  }
}

import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IDepartureRepository from '../Interfaces/IDepartureRepository';

@injectable()
export default class DepartureService {
  private departureRepository: IDepartureRepository;

  public constructor(@inject(INTERFACES.IDepartureRepository) departureRepository: IDepartureRepository) {
    this.departureRepository = departureRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const entriesQuantity = await this.departureRepository.count();
    const entries = await this.departureRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: entries,
      dataLength: entries.length,
      totalDataQuantity: entriesQuantity,
      totalPages: Math.ceil(entriesQuantity / itemsPerPage),
    };
  }
}

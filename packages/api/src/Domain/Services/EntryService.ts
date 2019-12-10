import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IEntryRepository from '../Interfaces/IEntryRepository';

@injectable()
export default class EntryService {
  private entryRepository: IEntryRepository;

  public constructor(@inject(INTERFACES.IEntryRepository) entryRepository: IEntryRepository) {
    this.entryRepository = entryRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const entriesQuantity = await this.entryRepository.count();
    const entries = await this.entryRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: entries,
      dataLength: entries.length,
      totalDataQuantity: entriesQuantity,
      totalPages: Math.ceil(entriesQuantity / itemsPerPage),
    };
  }
}

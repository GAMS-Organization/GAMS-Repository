import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IElementRepository from '../Interfaces/IElementRepository';

@injectable()
export default class ElementService {
  private elementRepository: IElementRepository;

  public constructor(@inject(INTERFACES.IElementRepository) elementRepository: IElementRepository) {
    this.elementRepository = elementRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const elementQuantity = await this.elementRepository.count();
    const elements = await this.elementRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: elements,
      dataLength: elements.length,
      totalDataQuantity: elementQuantity,
      totalPages: Math.ceil(elementQuantity / itemsPerPage),
    };
  }
}

import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IAreaRepository from '../Interfaces/IAreaRepository';

@injectable()
export default class AreaService {
  private areaRepository: IAreaRepository;

  public constructor(@inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository) {
    this.areaRepository = areaRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const areaQuantity = await this.areaRepository.count();
    const areas = await this.areaRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: areas,
      dataLength: areas.length,
      totalDataQuantity: areaQuantity,
      totalPages: Math.ceil(areaQuantity / itemsPerPage),
    };
  }
}

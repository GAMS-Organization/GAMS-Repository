import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import ISectorRepository from '../Interfaces/ISectorRepository';
import IAreaRepository from '../Interfaces/IAreaRepository';
import Sector from '../Entities/Sector';
import AreaServiceService from './AreaServiceService';

@injectable()
export default class SectorService {
  private sectorRepository: ISectorRepository;
  private areaRepository: IAreaRepository;
  private areaServiceService: AreaServiceService;

  public constructor(@inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository,
                     @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
                     @inject(AreaServiceService) areaServiceService: AreaServiceService) {
    this.sectorRepository = sectorRepository;
    this.areaRepository = areaRepository;
    this.areaServiceService = areaServiceService
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const sectorQuantity = await this.sectorRepository.count();
    const sectors = await this.sectorRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: sectors,
      dataLength: sectors.length,
      totalDataQuantity: sectorQuantity,
      totalPages: Math.ceil(sectorQuantity / itemsPerPage),
    };
  }

  public async deleteRelatedAreas(sector: Sector){
    const areas = await this.areaRepository.findBySectorId(sector.getId());
    let error = false;
    for(const area of areas){
      let result = await this.areaServiceService.destroyRelationsByArea(area);
      if(!result){
        error = true;
      }
      else{
        await this.areaRepository.destroy(area);
      }
    }
    return !error;
  }
}

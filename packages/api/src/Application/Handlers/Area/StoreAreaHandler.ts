import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import ISectorRepository from '../../../Domain/Interfaces/ISectorRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import Area from '../../../Domain/Entities/Area';
import StoreAreaCommand from '../../Commands/Area/StoreAreaCommand';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import AreaServiceService from '../../../Domain/Services/AreaServiceService';

@injectable()
export default class StoreAreaHandler {
  private areaRepository: IAreaRepository;
  private sectorRepository: ISectorRepository;
  private areaServiceService: AreaServiceService;

  public constructor(
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository,
    @inject(AreaServiceService) areaServiceService: AreaServiceService,
  ) {
    this.areaRepository = areaRepository;
    this.sectorRepository = sectorRepository;
    this.areaServiceService = areaServiceService;
  }

  public async execute(command: StoreAreaCommand): Promise<Area> {
    const sector = await this.sectorRepository.findOneBySectorName(command.getSector());

    if (!sector) {
      throw new EntityNotFoundException(`Sector with name: ${command.getSector()} not found`);
    }
    const area = new Area(command.getName(), command.getCode(), sector);
    return await this.areaServiceService.setServiceToArea(
      command.getServices(),
      await this.areaRepository.persist(area),
    );
  }
}

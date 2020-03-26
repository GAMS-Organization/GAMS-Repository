import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import Area from '../../../Domain/Entities/Area';
import ShowAreaBySectorCommand from '../../Commands/Area/ShowAreaBySectorCommand';
import ISectorRepository from '../../../Domain/Interfaces/ISectorRepository';

@injectable()
export default class ShowAreaBySectorHandler {
  private areaRepository: IAreaRepository;
  private sectorRepository: ISectorRepository;

  public constructor(
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository,
  ) {
    this.areaRepository = areaRepository;
    this.sectorRepository = sectorRepository;
  }

  public async execute(command: ShowAreaBySectorCommand): Promise<Area[]> {
    const sector = await this.sectorRepository.findOneBySectorName(command.getName());

    if (!sector) {
      throw new EntityNotFoundException(`Sector with slug: ${command.getName()} not found`);
    }

    const areas = await this.areaRepository.findBySectorId(sector.id);

    return areas;
  }
}

import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import ISectorRepository from '../../../Domain/Interfaces/ISectorRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import Area from '../../../Domain/Entities/Area';
import StoreAreaCommand from '../../Commands/Area/StoreAreaCommand';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class StoreAreaHandler {
  private areaRepository: IAreaRepository;
  private sectorRepository: ISectorRepository;

  public constructor(
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository,
  ) {
    this.areaRepository = areaRepository;
    this.sectorRepository = sectorRepository;
  }

  public async execute(command: StoreAreaCommand): Promise<Area> {
    const sector = await this.sectorRepository.findOneBySectorName(command.getSector());

    if (!sector) {
      throw new EntityNotFoundException(`Sector with name: ${command.getSector()} not found`);
    }
    const area = new Area(command.getName(), sector);
    return await this.areaRepository.persist(area);
  }
}

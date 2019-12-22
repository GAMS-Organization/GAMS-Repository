import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import ISectorRepository from '../../../Domain/Interfaces/ISectorRepository';
import DestroySectorCommand from '../../Commands/Sector/DestroySectorCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import SectorService from '../../../Domain/Services/SectorService';

@injectable()
export default class DestroySectorHandler {
  private sectorRepository: ISectorRepository;
  private sectorService: SectorService;

  public constructor(@inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository,
                     @inject(SectorService) sectorService: SectorService) {
    this.sectorRepository = sectorRepository;
    this.sectorService = sectorService;
  }

  public async execute(command: DestroySectorCommand): Promise<boolean> {
    const sector = await this.sectorRepository.findOneById(command.getId());

    if (!sector) {
      throw new EntityNotFoundException(`Sector with id: ${command.getId()} not found`);
    }

    const relationsWAsDestroyed = await this.sectorService.deleteRelatedAreas(sector);

    if(!relationsWAsDestroyed){
      throw new CannotDeleteEntity(`Areas relationed with the sector id: ${command.getId()} could not be deleted`);
    }

    const sectorWasDestroyed = await this.sectorRepository.destroy(sector);

    if (!sectorWasDestroyed) {
      throw new CannotDeleteEntity(`Sector with id: ${command.getId()} could not be deleted`);
    }

    return sectorWasDestroyed;
  }
}

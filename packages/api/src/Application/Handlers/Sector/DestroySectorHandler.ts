import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import ISectorRepository from '../../../Domain/Interfaces/ISectorRepository';
import DestroySectorCommand from '../../Commands/Sector/DestroySectorCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import SectorService from '../../../Domain/Services/SectorService';
import AssetService from '../../../Domain/Services/AssetService';

@injectable()
export default class DestroySectorHandler {
  private sectorRepository: ISectorRepository;
  private sectorService: SectorService;
  private assetService: AssetService;

  public constructor(@inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository,
                     @inject(SectorService) sectorService: SectorService,
                     @inject(AssetService)assetService: AssetService) {
    this.sectorRepository = sectorRepository;
    this.sectorService = sectorService;
    this.assetService = assetService;
  }

  public async execute(command: DestroySectorCommand): Promise<boolean> {
    const sector = await this.sectorRepository.findOneById(command.getId());

    if (!sector) {
      throw new EntityNotFoundException(`Sector with id: ${command.getId()} not found`);
    }

    await this.assetService.deleteFromSector(sector);

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

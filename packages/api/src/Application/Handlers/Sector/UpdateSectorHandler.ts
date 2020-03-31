import ISectorRepository from '../../../Domain/Interfaces/ISectorRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateSectorCommand from '../../Commands/Sector/UpdateSectorCommand';
import Sector from '../../../Domain/Entities/Sector';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class UpdateSectorHandler {
  private sectorRepository: ISectorRepository;
  public constructor(@inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository) {
    this.sectorRepository = sectorRepository;
  }

  public async execute(command: UpdateSectorCommand): Promise<Sector> {
    const sector = await this.sectorRepository.findOneById(command.getId());
    if (!sector) {
      throw new EntityNotFoundException(`Sector with id: ${command.getId()} not found`);
    }
    sector.setMap(command.getMap());
    return await this.sectorRepository.persist(sector);
  }
}

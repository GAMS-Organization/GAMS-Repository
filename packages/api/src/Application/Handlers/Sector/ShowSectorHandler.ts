import ISectorRepository from '../../../Domain/Interfaces/ISectorRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import ShowSectorCommand from '../../Commands/Sector/ShowSectorCommand';
import Sector from '../../../Domain/Entities/Sector';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class ShowUserHandler {
  private sectorRepository: ISectorRepository;

  public constructor(@inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository) {
    this.sectorRepository = sectorRepository;
  }

  public async execute(command: ShowSectorCommand): Promise<Sector> {
    const sector = await this.sectorRepository.findOneById(command.getId());
    if (!sector) {
      throw new EntityNotFoundException(`Sector with id: ${command.getId()} not found`);
    }
    return sector;
  }
}

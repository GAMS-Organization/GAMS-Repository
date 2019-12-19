import ISectorRepository from '../../../Domain/Interfaces/ISectorRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import Sector from '../../../Domain/Entities/Sector';
import StoreSectorCommand from '../../Commands/Sector/StoreSectorCommand';

@injectable()
export default class StoreSectorHandler {
  private sectorRepository: ISectorRepository;
  public constructor(@inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository) {
    this.sectorRepository = sectorRepository;
  }

  public async execute(command: StoreSectorCommand): Promise<Sector> {
    const sector = new Sector(command.getName(), command.getCode());
    return await this.sectorRepository.persist(sector);
  }
}

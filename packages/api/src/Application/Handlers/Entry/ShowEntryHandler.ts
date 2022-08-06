import IEntryRepository from '../../../Domain/Interfaces/IEntryRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import ShowEntryCommand from '../../Commands/Entry/ShowEntryCommand';
import Entry from '../../../Domain/Entities/Entry';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class ShowEntryHandler {
  private entryRepository: IEntryRepository;

  public constructor(@inject(INTERFACES.IEntryRepository) entryRepository: IEntryRepository) {
    this.entryRepository = entryRepository;
  }

  public async execute(command: ShowEntryCommand): Promise<Entry> {
    const entry = await this.entryRepository.findOneById(command.getId());
    if (!entry) {
      throw new EntityNotFoundException(`No se encontró la entrada con id: ${command.getId()}`);
    }
    return entry;
  }
}

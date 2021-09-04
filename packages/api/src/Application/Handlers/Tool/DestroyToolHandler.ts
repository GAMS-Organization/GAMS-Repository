import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IToolRepository from '../../../Domain/Interfaces/IToolRepository';
import DestroyToolCommand from '../../Commands/Tool/DestroyToolCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';

@injectable()
export default class DestroyToolHandler {
  private toolRepository: IToolRepository;

  public constructor(@inject(INTERFACES.IToolRepository) toolRepository: IToolRepository) {
    this.toolRepository = toolRepository;
  }

  public async execute(command: DestroyToolCommand): Promise<boolean> {
    const tool = await this.toolRepository.findOneById(command.getId());

    if (!tool) {
      throw new EntityNotFoundException(`Tool with id: ${command.getId()} not found`);
    }

    const toolWasDestroyed = await this.toolRepository.destroy(tool);

    if (!toolWasDestroyed) {
      throw new CannotDeleteEntity(`Tool with id: ${command.getId()} could not be deleted`);
    }

    return toolWasDestroyed;
  }
}

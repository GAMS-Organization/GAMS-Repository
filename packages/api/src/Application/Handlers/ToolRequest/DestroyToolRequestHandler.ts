import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IToolRequestRepository from '../../../Domain/Interfaces/IToolRequestRepository';
import DestroyToolRequestCommand from '../../Commands/ToolRequest/DestroyToolRequestCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';

@injectable()
export default class DestroyToolRequestHandler {
  private toolRequestRepository: IToolRequestRepository;

  public constructor(@inject(INTERFACES.IToolRequestRepository) toolRequestRepository: IToolRequestRepository) {
    this.toolRequestRepository = toolRequestRepository;
  }

  public async execute(command: DestroyToolRequestCommand): Promise<boolean> {
    const toolRequest = await this.toolRequestRepository.findOneById(command.getId());

    if (!toolRequest) {
      throw new EntityNotFoundException(`ToolRequest with id: ${command.getId()} not found`);
    }

    const toolRequestWasDestroyed = await this.toolRequestRepository.destroy(toolRequest);

    if (!toolRequestWasDestroyed) {
      throw new CannotDeleteEntity(`ToolRequest with id: ${command.getId()} could not be deleted`);
    }

    return toolRequestWasDestroyed;
  }
}

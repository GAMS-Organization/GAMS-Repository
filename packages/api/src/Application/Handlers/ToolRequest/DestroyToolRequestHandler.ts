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
      throw new EntityNotFoundException(`No se encontró la solicitud de herramienta con id: ${command.getId()}`);
    }

    const toolRequestWasDestroyed = await this.toolRequestRepository.destroy(toolRequest);

    if (!toolRequestWasDestroyed) {
      throw new CannotDeleteEntity(`No se pudo borrar la solicitud de herramienta con id: ${command.getId()}`);
    }

    return toolRequestWasDestroyed;
  }
}

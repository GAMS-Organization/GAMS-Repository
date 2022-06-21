import IToolRequestRepository from '../../../Domain/Interfaces/IToolRequestRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateToolRequestCommand from '../../Commands/ToolRequest/UpdateToolRequestCommand';
import ToolRequest from '../../../Domain/Entities/ToolRequest';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import IToolRepository from '../../../Domain/Interfaces/IToolRepository';
import { STATUS } from '../../../API/Http/Enums/Tool';
import ToolService from '../../../Domain/Services/ToolService';
import CannotUpdateEntity from '../../Exceptions/CannotUpdateEntity';

@injectable()
export default class UpdateToolRequestHandler {
  private toolRequestRepository: IToolRequestRepository;
  private toolRepository: IToolRepository;
  private areaRepository: IAreaRepository;
  private toolService: ToolService;

  public constructor(
    @inject(INTERFACES.IToolRequestRepository) toolRequestRepository: IToolRequestRepository,
    @inject(INTERFACES.IToolRepository) toolRepository: IToolRepository,
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(ToolService) toolService: ToolService,
  ) {
    this.toolRequestRepository = toolRequestRepository;
    this.toolRepository = toolRepository;
    this.areaRepository = areaRepository;
    this.toolService = toolService;
  }

  public async execute(command: UpdateToolRequestCommand): Promise<ToolRequest> {
    const toolRequest = await this.toolRequestRepository.findOneById(command.getId());
    if (!toolRequest) {
      throw new EntityNotFoundException(`ToolRequest with id: ${command.getId()} not found`);
    }

    const tool = await this.toolRepository.findOneById(command.getToolId());

    if (!tool) {
      throw new EntityNotFoundException(`Tool with id: ${command.getToolId()} not found`);
    }

    const area = await this.areaRepository.findOneById(command.getAreaId());

    if (!area) {
      throw new EntityNotFoundException(`Area with id: ${command.getAreaId()} not found`);
    }

    if(toolRequest.getStatus() === STATUS.CANCELED) {
      throw new CannotUpdateEntity('La solicitud ha sido cancelada y no puede ser actualizada');
    }

    if(toolRequest.getStatus() === STATUS.RETURNED){
      throw new CannotUpdateEntity('La herramienta ya ha sido devuelta');
    }

    if(command.getStatus() === STATUS.CANCELED && toolRequest.getStatus() !== STATUS.PENDING) {
      throw new CannotUpdateEntity('La solicitud puede ser cancelada solamente si el estado actual es pendiente');
    }

    toolRequest.setStatus(command.getStatus());
    toolRequest.getArea().getId() !== command.getAreaId() ? toolRequest.setArea(area) : null;
    toolRequest.getTool().getId() !== command.getToolId() ? toolRequest.setTool(tool) : null;

    if (command.getStatus() === STATUS.RETURNED || command.getStatus() === STATUS.CANCELED) {
      await this.toolService.updateQuantity(toolRequest.getQuantity(), tool, 'return');
    }

    return await this.toolRequestRepository.persist(toolRequest);
  }
}

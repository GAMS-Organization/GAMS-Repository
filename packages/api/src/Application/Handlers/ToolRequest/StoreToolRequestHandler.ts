import IToolRequestRepository from '../../../Domain/Interfaces/IToolRequestRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreToolRequestCommand from '../../Commands/ToolRequest/StoreToolRequestCommand';
import ToolRequest from '../../../Domain/Entities/ToolRequest';
import IToolRepository from '../../../Domain/Interfaces/IToolRepository';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import { STATUS } from '../../../API/Http/Enums/Tool';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import ToolService from '../../../Domain/Services/ToolService';

@injectable()
export default class StoreToolRequestHandler {
  private toolRequestRepository: IToolRequestRepository;
  private toolRepository: IToolRepository;
  private userRepository: IUserRepository;
  private areaRepository: IAreaRepository;
  private toolService: ToolService;
  public constructor(
    @inject(INTERFACES.IToolRequestRepository) toolRequestRepository: IToolRequestRepository,
    @inject(INTERFACES.IToolRepository) toolRepository: IToolRepository,
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(ToolService) toolService: ToolService,
  ) {
    this.toolRequestRepository = toolRequestRepository;
    this.toolRepository = toolRepository;
    this.userRepository = userRepository;
    this.areaRepository = areaRepository;
    this.toolService = toolService;
  }

  public async execute(command: StoreToolRequestCommand): Promise<ToolRequest> {
    const tool = await this.toolRepository.findOneById(command.getToolId());

    if (!tool) {
      throw new EntityNotFoundException(`Tool with id: ${command.getToolId()} not found`);
    }

    const user = await this.userRepository.findOneById(command.getUserId());

    if (!user) {
      throw new EntityNotFoundException(`User with id: ${command.getUserId()} not found`);
    }

    const area = await this.areaRepository.findOneById(command.getAreaId());

    if (!area) {
      throw new EntityNotFoundException(`Area with id: ${command.getAreaId()} not found`);
    }

    const toolUpdated = await this.toolService.updateQuantity(command.getQuantity(), tool, 'borrow');

    const toolRequest = new ToolRequest(
      toolUpdated,
      user,
      STATUS.PENDING,
      command.getDate(),
      area,
      command.getQuantity(),
    );

    return await this.toolRequestRepository.persist(toolRequest);
  }
}

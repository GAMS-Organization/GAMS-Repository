import IToolRepository from '../../../Domain/Interfaces/IToolRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreToolCommand from '../../Commands/Tool/StoreToolCommand';
import Tool from '../../../Domain/Entities/Tool';

@injectable()
export default class StoreToolHandler {
  private toolRepository: IToolRepository;
  public constructor(@inject(INTERFACES.IToolRepository) toolRepository: IToolRepository) {
    this.toolRepository = toolRepository;
  }

  public async execute(command: StoreToolCommand): Promise<Tool> {
    const tool = new Tool(command.getName(), command.getTotalQuantity(), command.getBorrowQuantity());
    return await this.toolRepository.persist(tool);
  }
}

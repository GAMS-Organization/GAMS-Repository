import IToolRepository from '../../../Domain/Interfaces/IToolRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import Tool from '../../../Domain/Entities/Tool';
import UpdateToolCommand from '../../Commands/Tool/UpdateToolCommand';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class UpdateToolHandler {
  private toolRepository: IToolRepository;
  public constructor(@inject(INTERFACES.IToolRepository) toolRepository: IToolRepository) {
    this.toolRepository = toolRepository;
  }

  public async execute(command: UpdateToolCommand): Promise<Tool> {
    const tool = await this.toolRepository.findOneById(command.getId());

    if (!tool) {
      throw new EntityNotFoundException(`Tool with id: ${command.getId()} not found`);
    }

    tool.getName() !== command.getName() ? tool.setName(command.getName()) : null;
    tool.getTotalQuantity() !== command.getTotalQuantity() ? tool.setTotalQuantity(command.getTotalQuantity()) : null;
    tool.getBorrowQuantity() !== command.getBorrowQuantity()
      ? tool.setBorrowQuantity(command.getBorrowQuantity())
      : null;

    return await this.toolRepository.persist(tool);
  }
}

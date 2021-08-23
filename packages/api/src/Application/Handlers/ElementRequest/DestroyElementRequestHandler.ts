import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IElementRequestRepository from '../../../Domain/Interfaces/IElementRequestRepository';
import DestroyElementRequestCommand from '../../Commands/ElementRequest/DestroyElementRequestCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';

@injectable()
export default class DestroyElementRequestHandler {
  private elementRequestRepository: IElementRequestRepository;

  public constructor(
    @inject(INTERFACES.IElementRequestRepository) elementRequestRepository: IElementRequestRepository,
  ) {
    this.elementRequestRepository = elementRequestRepository;
  }

  public async execute(command: DestroyElementRequestCommand): Promise<boolean> {
    const elementRequest = await this.elementRequestRepository.findOneById(command.getId());

    if (!elementRequest) {
      throw new EntityNotFoundException(`ElementRequest with id: ${command.getId()} not found`);
    }

    const elementRequestWasDestroyed = await this.elementRequestRepository.destroy(elementRequest);

    if (!elementRequestWasDestroyed) {
      throw new CannotDeleteEntity(`ElementRequest with id: ${command.getId()} could not be deleted`);
    }

    return elementRequestWasDestroyed;
  }
}

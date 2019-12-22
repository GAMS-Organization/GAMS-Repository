import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IElementRepository from '../../../Domain/Interfaces/IElementRepository';
import DestroyElementCommand from '../../Commands/Element/DestroyElementCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';

@injectable()
export default class DestroyElementHandler {
  private elementRepository: IElementRepository;

  public constructor(@inject(INTERFACES.IElementRepository) elementRepository: IElementRepository) {
    this.elementRepository = elementRepository;
  }

  public async execute(command: DestroyElementCommand): Promise<boolean> {
    const element = await this.elementRepository.findOneById(command.getId());

    if (!element) {
      throw new EntityNotFoundException(`Element with id: ${command.getId()} not found`);
    }
    const elementWasDestroyed = await this.elementRepository.destroy(element);

    if (!elementWasDestroyed) {
      throw new CannotDeleteEntity(`Element with id: ${command.getId()} could not be deleted`);
    }

    return elementWasDestroyed;
  }
}

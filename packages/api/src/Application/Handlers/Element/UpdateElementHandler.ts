import IElementRepository from '../../../Domain/Interfaces/IElementRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateElementCommand from '../../Commands/Element/UpdateElementCommand';
import Element from '../../../Domain/Entities/Element';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class UpdateElementHandler {
  private ElementRepository: IElementRepository;
  public constructor(@inject(INTERFACES.IElementRepository) ElementRepository: IElementRepository) {
    this.ElementRepository = ElementRepository;
  }

  public async execute(command: UpdateElementCommand): Promise<Element> {
    const Element = await this.ElementRepository.findOneById(command.getId());
    if (!Element) {
      throw new EntityNotFoundException(`Element with id: ${command.getId()} not found`);
    }
    Element.setName(command.getName());
    Element.setDescription(command.getDescription());
    Element.setSteps(command.getSteps());

    return await this.ElementRepository.persist(Element);
  }
}

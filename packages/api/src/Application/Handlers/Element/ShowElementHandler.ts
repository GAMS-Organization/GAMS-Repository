import IElementRepository from '../../../Domain/Interfaces/IElementRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import ShowElementCommand from '../../Commands/Element/ShowElementCommand';
import Element from '../../../Domain/Entities/Element';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class ShowElementHandler {
  private elementRepository: IElementRepository;

  public constructor(@inject(INTERFACES.IElementRepository) elementRepository: IElementRepository) {
    this.elementRepository = elementRepository;
  }

  public async execute(command: ShowElementCommand): Promise<Element> {
    const element = await this.elementRepository.findOneById(command.getId());
    if (!element) {
      throw new EntityNotFoundException(`No se encontró el artículo con id: ${command.getId()}`);
    }
    return element;
  }
}

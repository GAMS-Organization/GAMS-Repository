import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IElementRepository from '../../../Domain/Interfaces/IElementRepository';
import DestroyElementCommand from '../../Commands/Element/DestroyElementCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import AssetService from '../../../Domain/Services/AssetService';

@injectable()
export default class DestroyElementHandler {
  private elementRepository: IElementRepository;
  private assetService: AssetService;

  public constructor(
    @inject(INTERFACES.IElementRepository) elementRepository: IElementRepository,
    @inject(AssetService) assetService: AssetService,
  ) {
    this.elementRepository = elementRepository;
    this.assetService = assetService;
  }

  public async execute(command: DestroyElementCommand): Promise<boolean> {
    const element = await this.elementRepository.findOneById(command.getId());

    if (!element) {
      throw new EntityNotFoundException(`No se encontró el elemento con id: ${command.getId()}`);
    }

    await this.assetService.deleteFromElement(element);

    const elementWasDestroyed = await this.elementRepository.destroy(element);

    if (!elementWasDestroyed) {
      throw new CannotDeleteEntity(`No se pudo borrar el elemento con id: ${command.getId()}`);
    }

    return elementWasDestroyed;
  }
}

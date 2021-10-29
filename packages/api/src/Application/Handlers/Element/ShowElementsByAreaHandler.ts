import IElementRepository from '../../../Domain/Interfaces/IElementRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import ShowElementsByAreaCommand from '../../Commands/Element/ShowElementsByAreaCommand';
import Element from '../../../Domain/Entities/Element';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import AssetService from '../../../Domain/Services/AssetService';

@injectable()
export default class ShowElementsByAreaHandler {
  private elementRepository: IElementRepository;
  private areaRepository: IAreaRepository;
  private assetService: AssetService;

  public constructor(
    @inject(INTERFACES.IElementRepository) elementRepository: IElementRepository,
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(AssetService) assetService: AssetService,
  ) {
    this.elementRepository = elementRepository;
    this.areaRepository = areaRepository;
    this.assetService = assetService;
  }

  public async execute(command: ShowElementsByAreaCommand): Promise<Element[]> {
    const area = await this.areaRepository.findOneById(command.getAreaId());
    if (!area) {
      throw new EntityNotFoundException(`Area with id: ${command.getAreaId()} not found`);
    }

    const assets = await this.assetService.findAssetsFromArea(area.getId());

    const elementIds = [];

    assets.forEach(asset => {
      const elementId = asset.getElement().getId();
      if (!elementIds.includes(elementId)) {
        elementIds.push(elementId);
      }
    });

    const elements = [];

    for (const id of elementIds) {
      elements.push(await this.elementRepository.findOneById(id));
    }

    return elements;
  }
}

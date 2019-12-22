import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import Asset from '../Entities/Asset';
import Sector from '../Entities/Sector';
import Area from '../Entities/Area';
import Service from '../Entities/Service';
import Element from '../Entities/Element';
import IServiceRepository from '../Interfaces/IServiceRepository';
import ISectorRepository from '../Interfaces/ISectorRepository';
import IAreaRepository from '../Interfaces/IAreaRepository';
import IElementRepository from '../Interfaces/IElementRepository';
import EntityNotFoundException from '../../Application/Exceptions/EntityNotFoundException';
import IAssetRepository from '../Interfaces/IAssetRepository';

@injectable()
export default class AssetService {
  private sectorRepository: ISectorRepository;
  private areaRepository: IAreaRepository;
  private serviceRepository: IServiceRepository;
  private elementRepository: IElementRepository;
  private assetRepository: IAssetRepository;


  public constructor(
    @inject(INTERFACES.ISectorRepository) sectorRepository: ISectorRepository,
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(INTERFACES.IServiceRepository) serviceRepository: IServiceRepository,
    @inject(INTERFACES.IElementRepository) elementRepository: IElementRepository,
    @inject(INTERFACES.IAssetRepository) assetRepository: IAssetRepository,


  ) {
    this.serviceRepository = serviceRepository;
    this.sectorRepository = sectorRepository;
    this.areaRepository = areaRepository;
    this.elementRepository = elementRepository;
    this.assetRepository = assetRepository;
  }

  public async setRelationsToAsset(commandSector: string, commandArea: string, commandService: string, commandElement: string ): Promise<Asset> {
    const sector = await this.sectorRepository.findOneBySectorName(commandSector);
    if (!sector) {
      throw new EntityNotFoundException(`Sector with name: ${commandSector} not found`);
    }
    const area = await this.areaRepository.findOneByAreaName(commandArea);
    if (!area) {
      throw new EntityNotFoundException(`Area with name: ${commandArea} not found`);
    }
    const service = await this.serviceRepository.findOneByServiceName(commandService);
    if (!service) {
      throw new EntityNotFoundException(`Service with name: ${commandService} not found`);
    }
    const element = await this.elementRepository.findOneByElementName(commandElement);
    if (!element) {
      throw new EntityNotFoundException(`Element with name: ${commandElement} not found`);
    }

    const code = await this.createAssetCode(sector, area, service, element);

    const asset = new Asset(sector, area, service, element, code);

    return await this.assetRepository.persist(asset);
  }

  public async createAssetCode(sector: Sector, area: Area, service: Service, element: Element): Promise<string>{
    const sectorCode = sector.getCode();
    const areaCode = area.getCode();
    const serviceCode = service.getCode();
    const elementCode = element.getCode();

    let numero = 1;

    let assetCode = sectorCode + '-' + areaCode + '-' + serviceCode + '-' + elementCode + numero;

    let asset = await this.assetRepository.findOneByCode(assetCode);

    while(asset){
      numero++;
      assetCode = sectorCode + '-' + areaCode + '-' + serviceCode + '-' + elementCode + numero;
      asset = await this.assetRepository.findOneByCode(assetCode)
    }

    return assetCode;
  }
}

import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IServiceRepository from '../../../Domain/Interfaces/IServiceRepository';
import DestroyServiceCommand from '../../Commands/Service/DestroyServiceCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import AreaServiceService from '../../../Domain/Services/AreaServiceService';
import ServiceService from '../../../Domain/Services/ServiceService';
import AssetService from '../../../Domain/Services/AssetService';

@injectable()
export default class DestroyServiceHandler {
  private serviceRepository: IServiceRepository;
  private areaServiceService: AreaServiceService;
  private serviceService: ServiceService;
  private assetService: AssetService;


  public constructor(
    @inject(INTERFACES.IServiceRepository) serviceRepository: IServiceRepository,
    @inject(AreaServiceService) areaServiceService: AreaServiceService,
    @inject(ServiceService)serviceService: ServiceService,
    @inject(AssetService)assetService: AssetService)
  {
    this.serviceRepository = serviceRepository;
    this.areaServiceService = areaServiceService;
    this.serviceService = serviceService;
    this.assetService= assetService;
  }

  public async execute(command: DestroyServiceCommand): Promise<boolean> {
    const service = await this.serviceRepository.findOneById(command.getId());

    if (!service) {
      throw new EntityNotFoundException(`Service with id: ${command.getId()} not found`);
    }

    const relationsWAsDestroyed = await this.areaServiceService.destroyRelationsByService(service);

    if(!relationsWAsDestroyed){
      throw new CannotDeleteEntity(`Areas relationed with the service id: ${command.getId()} could not be deleted`);
    }

    await this.assetService.deleteFromService(service);

    const relationedElementWasDestroyed = await this.serviceService.deleteRelatedElements(service);

    if(!relationedElementWasDestroyed){
      throw new CannotDeleteEntity(`Elements relationed with the service id: ${command.getId()} could not be deleted`);
    }

    const serviceWasDestroyed = await this.serviceRepository.destroy(service);

    if (!serviceWasDestroyed) {
      throw new CannotDeleteEntity(`Service with id: ${command.getId()} could not be deleted`);
    }

    return serviceWasDestroyed;
  }
}

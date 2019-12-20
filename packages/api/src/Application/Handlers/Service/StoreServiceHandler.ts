import IServiceRepository from '../../../Domain/Interfaces/IServiceRepository';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import Service from '../../../Domain/Entities/Service';
import StoreServiceCommand from '../../Commands/Service/StoreServiceCommand';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import AreaServiceService from '../../../Domain/Services/AreaServiceService';

@injectable()
export default class StoreServiceHandler {
  private areaRepository: IAreaRepository;
  private serviceRepository: IServiceRepository;
  private areaServiceService: AreaServiceService;

  public constructor(
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(INTERFACES.IServiceRepository) serviceRepository: IServiceRepository,
    @inject(AreaServiceService) areaServiceService: AreaServiceService,
  ) {
    this.areaRepository = areaRepository;
    this.serviceRepository = serviceRepository;
    this.areaServiceService = areaServiceService;
  }

  public async execute(command: StoreServiceCommand): Promise<Service> {
    const area = await this.areaRepository.findOneByAreaName(command.getArea());

    if (!area) {
      throw new EntityNotFoundException(`Area with name: ${command.getArea()} not found`);
    }

    const service = new Service(command.getName(), command.getCode());
    return await this.areaServiceService.setServiceToArea(await this.serviceRepository.persist(service), area);
  }
}

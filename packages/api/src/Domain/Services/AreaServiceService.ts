import IAreaServiceRepository from '../Interfaces/IAreaServiceRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import AreaService from '../Entities/AreaService';
import Area from '../Entities/Area';
import IServiceRepository from '../Interfaces/IServiceRepository';

@injectable()
export default class AreaServiceService {
  private areaServiceRepository: IAreaServiceRepository;
  private serviceRepository: IServiceRepository;


  public constructor(
    @inject(INTERFACES.IAreaServiceRepository) areaServiceRepository: IAreaServiceRepository,
    @inject(INTERFACES.IServiceRepository) serviceRepository: IServiceRepository,
  ) {
    this.areaServiceRepository = areaServiceRepository;
    this.serviceRepository = serviceRepository;

  }

  public async setServiceToArea(commandServices: string[], area: Area): Promise<Area> {
    const services = await this.serviceRepository.findAll();

    for (const service of services) {
      const serviceName = service.getName();
      if (commandServices.includes(serviceName)) {
        const areaService = new AreaService(area, service);
        await this.areaServiceRepository.persist(areaService);
      }
    }

    return area
  }
}

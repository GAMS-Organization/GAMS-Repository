import IAreaServiceRepository from '../Interfaces/IAreaServiceRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import AreaService from '../Entities/AreaService';
import Area from '../Entities/Area';
import IServiceRepository from '../Interfaces/IServiceRepository';
import Service from '../Entities/Service';

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

    return area;
  }

  public async destroyRelationsByArea(area: Area) {
    const relations = await this.areaServiceRepository.findByAreaName(area.getId());
    let error = false;
    for (const relation of relations) {
      let result = await this.areaServiceRepository.destroy(relation);
      if (!result) {
        error = true;
      }
    }

    return !error;
  }

  public async destroyRelationsByService(service: Service) {
    const relations = await this.areaServiceRepository.findByServiceName(service.getId());
    let error = false;
    for (const relation of relations) {
      let result = await this.areaServiceRepository.destroy(relation);
      if (!result) {
        error = true;
      }
    }

    return !error;
  }
}

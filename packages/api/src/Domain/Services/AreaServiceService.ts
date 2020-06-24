import IAreaServiceRepository from '../Interfaces/IAreaServiceRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import AreaService from '../Entities/AreaService';
import Area from '../Entities/Area';
import IServiceRepository from '../Interfaces/IServiceRepository';
import Service from '../Entities/Service';
import AssetService from './AssetService';
import IAreaRepository from '../Interfaces/IAreaRepository';

@injectable()
export default class AreaServiceService {
  private areaServiceRepository: IAreaServiceRepository;
  private serviceRepository: IServiceRepository;
  private areaRepository: IAreaRepository;
  private assetService: AssetService;

  public constructor(
    @inject(INTERFACES.IAreaServiceRepository) areaServiceRepository: IAreaServiceRepository,
    @inject(INTERFACES.IServiceRepository) serviceRepository: IServiceRepository,
    @inject(AssetService) assetService: AssetService,
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
  ) {
    this.areaServiceRepository = areaServiceRepository;
    this.serviceRepository = serviceRepository;
    this.assetService = assetService;
    this.areaRepository = areaRepository;
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

  public async safeDestroyAreaRelationsByArea(area: Area) {
    await this.assetService.deleteFromArea(area);
    return await this.destroyRelationsByArea(area);
  }

  public async safeDestroyAreaRelationsByService(service: Service) {
    return await this.destroyRelationsByService(service);
  }

  public async updateServices(area: Area, commandServices: string[]) {
    const services = await this.serviceRepository.findAll();
    for (const service of services) {
      const serviceName = service.getName();
      if (commandServices.includes(serviceName) && !area.getServicesNames().includes(serviceName)) {
        const areaService = new AreaService(area, service);
        await this.areaServiceRepository.persist(areaService);
      }
    }
    for (const serviceInArea of area.getServicesNames()) {
      if (!commandServices.includes(serviceInArea)) {
        const serviceToDeleteRelation = await this.serviceRepository.findOneByServiceName(serviceInArea);
        await this.safeDestroyAreaRelationsByService(serviceToDeleteRelation);
      }
    }

    return await this.areaRepository.findOneById(area.getId());
  }
}

import IAreaServiceRepository from '../Interfaces/IAreaServiceRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import AreaService from '../Entities/AreaService';
import Service from '../Entities/Service';
import Area from '../Entities/Area';
import ApplicationError from '../../Application/Exceptions/ApplicationError';

@injectable()
export default class AreaServiceService {
  private areaServiceRepository: IAreaServiceRepository;

  public constructor(@inject(INTERFACES.IAreaServiceRepository) areaServiceRepository: IAreaServiceRepository) {
    this.areaServiceRepository = areaServiceRepository;
  }

  public async setServiceToArea(service: Service, area: Area): Promise<Service> {
    const areaService = new AreaService(area, service);
    const result = await this.areaServiceRepository.persist(areaService);

    if (!result) {
      throw new ApplicationError('AreaServiceService', `AreaService can't be persisted`);
    }

    return service;
  }
}

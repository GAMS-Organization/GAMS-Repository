import IServiceRepository from '../../../Domain/Interfaces/IServiceRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import Service from '../../../Domain/Entities/Service';
import StoreServiceCommand from '../../Commands/Service/StoreServiceCommand';

@injectable()
export default class StoreServiceHandler {
  private serviceRepository: IServiceRepository;

  public constructor(@inject(INTERFACES.IServiceRepository) serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  public async execute(command: StoreServiceCommand): Promise<Service> {
    const service = new Service(command.getName(), command.getCode());
    return await this.serviceRepository.persist(service);
  }
}

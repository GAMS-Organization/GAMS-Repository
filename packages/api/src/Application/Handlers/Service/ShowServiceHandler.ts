import IServiceRepository from '../../../Domain/Interfaces/IServiceRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import ShowServiceCommand from '../../Commands/Service/ShowServiceCommand';
import Service from '../../../Domain/Entities/Service';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class ShowUserHandler {
  private serviceRepository: IServiceRepository;

  public constructor(@inject(INTERFACES.IServiceRepository) serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  public async execute(command: ShowServiceCommand): Promise<Service> {
    const service = await this.serviceRepository.findOneByServiceName(command.getName());
    console.log(service);
    if (!service) {
      throw new EntityNotFoundException(`Service with id: ${command.getName()} not found`);
    }
    return service;
  }
}

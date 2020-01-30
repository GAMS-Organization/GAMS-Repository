import IElementRepository from '../../../Domain/Interfaces/IElementRepository';
import IServiceRepository from '../../../Domain/Interfaces/IServiceRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import Element from '../../../Domain/Entities/Element';
import StoreElementCommand from '../../Commands/Element/StoreElementCommand';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class StoreElementHandler {
  private elementRepository: IElementRepository;
  private serviceRepository: IServiceRepository;

  public constructor(
    @inject(INTERFACES.IElementRepository) elementRepository: IElementRepository,
    @inject(INTERFACES.IServiceRepository) serviceRepository: IServiceRepository,
  ) {
    this.elementRepository = elementRepository;
    this.serviceRepository = serviceRepository;
  }

  public async execute(command: StoreElementCommand): Promise<Element> {
    const service = await this.serviceRepository.findOneByServiceName(command.getService());

    if (!service) {
      throw new EntityNotFoundException(`Service with name: ${command.getService()} not found`);
    }

    const element = new Element(command.getName(), command.getCode(), service, command.getDescription());
    return await this.elementRepository.persist(element);
  }
}

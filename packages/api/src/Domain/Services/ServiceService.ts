import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IServiceRepository from '../Interfaces/IServiceRepository';
import Service from '../Entities/Service';
import IElementRepository from '../Interfaces/IElementRepository';

@injectable()
export default class ServiceService {
  private serviceRepository: IServiceRepository;
  private elementRepository: IElementRepository;

  public constructor(@inject(INTERFACES.IServiceRepository) serviceRepository: IServiceRepository,
                     @inject(INTERFACES.IElementRepository) elementRepository: IElementRepository) {
    this.serviceRepository = serviceRepository;
    this.elementRepository = elementRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const serviceQuantity = await this.serviceRepository.count();
    const services = await this.serviceRepository.findAllPaginated(itemsPerPage * page - itemsPerPage, itemsPerPage);
    return {
      data: services,
      dataLength: services.length,
      totalDataQuantity: serviceQuantity,
      totalPages: Math.ceil(serviceQuantity / itemsPerPage),
    };
  }

  public async deleteRelatedElements(service: Service){
    const elements = await this.elementRepository.findByServiceId(service.getId());
    let error = false;
    for(const element of elements){
      let result = await this.elementRepository.destroy(element);
      if(!result){
        error = true;
      }
    }
    return !error;
  }
}

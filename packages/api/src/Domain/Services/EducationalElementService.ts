import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IEducationalElementRepository from '../Interfaces/IEducationalElementRepository';

@injectable()
export default class EducationalElementService {
  private educationalElementRepository: IEducationalElementRepository;

  public constructor(
    @inject(INTERFACES.IEducationalElementRepository) educationalElementRepository: IEducationalElementRepository,
  ) {
    this.educationalElementRepository = educationalElementRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const educationalElementQuantity = await this.educationalElementRepository.count();
    const educationalElements = await this.educationalElementRepository.findAllPaginated(
      itemsPerPage * page - itemsPerPage,
      itemsPerPage,
    );
    return {
      data: educationalElements,
      dataLength: educationalElements.length,
      totalDataQuantity: educationalElementQuantity,
      totalPages: Math.ceil(educationalElementQuantity / itemsPerPage),
    };
  }
}

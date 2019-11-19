import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IEducationRepository from '../Interfaces/IEducationRepository';

@injectable()
export default class EducationService {
  private educationRepository: IEducationRepository;

  public constructor(@inject(INTERFACES.IEducationRepository) educationRepository: IEducationRepository) {
    this.educationRepository = educationRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const educationQuantity = await this.educationRepository.count();
    const educationProfiles = await this.educationRepository.findAllPaginated(
      itemsPerPage * page - itemsPerPage,
      itemsPerPage,
    );
    return {
      data: educationProfiles,
      dataLength: educationProfiles.length,
      totalDataQuantity: educationQuantity,
      totalPages: Math.ceil(educationQuantity / itemsPerPage),
    };
  }
}

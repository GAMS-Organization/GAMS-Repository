import IRooftopperProfileRepository from '../Interfaces/IRooftopperProfileRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';

@injectable()
export default class RooftopperProfileService {
  private rooftopperProfileRepository: IRooftopperProfileRepository;

  public constructor(
    @inject(INTERFACES.IRooftopperProfileRepository) rooftopperProfileRepository: IRooftopperProfileRepository,
  ) {
    this.rooftopperProfileRepository = rooftopperProfileRepository;
  }

  public async returnAllPaginated(
    page: number = 1,
    itemsPerPage: number = parseInt(process.env.PAGINATED_RESULTS),
  ): Promise<PaginatedSuccessData> {
    const rooftopperQuantity = await this.rooftopperProfileRepository.count();
    const rooftopperProfiles = await this.rooftopperProfileRepository.findAllPaginated(
      itemsPerPage * page - itemsPerPage,
      itemsPerPage,
    );
    return {
      data: rooftopperProfiles,
      dataLength: rooftopperProfiles.length,
      totalDataQuantity: rooftopperQuantity,
      totalPages: Math.ceil(rooftopperQuantity / itemsPerPage),
    };
  }

  public async validateUniqueSlug(slug: string): Promise<object | void> {
    const alreadySavedRooftopper = await this.rooftopperProfileRepository.findOneByRooftopperSlug(slug);

    if (alreadySavedRooftopper) {
      return {
        errors: {
          slug: {
            field: 'slug',
            type: '',
            message: 'Slug value is already used',
          },
        },
      };
    }
  }
}

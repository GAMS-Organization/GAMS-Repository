import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import IEducationalElementRepository from '../Interfaces/IEducationalElementRepository';
import EducationalElement from '../Entities/EducationalElement';
import EntityNotFoundException from '../../Application/Exceptions/EntityNotFoundException';

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

  public async updateQuantity(
    quantity: number,
    educationalElement: EducationalElement,
    type: 'borrow' | 'return',
  ): Promise<EducationalElement> {
    const totalQuantity = educationalElement.getTotalQuantity();
    const borrowedQuantity = educationalElement.getBorrowQuantity();
    if (type === 'borrow') {
      const available = totalQuantity - borrowedQuantity;
      if (quantity > available) {
        throw new EntityNotFoundException('The amount requested is bigger than the available');
      }
      educationalElement.setBorrowQuantity(borrowedQuantity + quantity);
    } else {
      if (borrowedQuantity - quantity < 0) {
        educationalElement.setBorrowQuantity(0);
      } else {
        educationalElement.setBorrowQuantity(borrowedQuantity - quantity);
      }
    }
    return this.educationalElementRepository.persist(educationalElement);
  }
}

import IEducationalElementRepository from '../../../Domain/Interfaces/IEducationalElementRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EducationalElement from '../../../Domain/Entities/EducationalElement';
import UpdateEducationalElementCommand from '../../Commands/EducationalElement/UpdateEducationalElementCommand';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class UpdateEducationalElementHandler {
  private educationalElementRepository: IEducationalElementRepository;
  public constructor(
    @inject(INTERFACES.IEducationalElementRepository) educationalElementRepository: IEducationalElementRepository,
  ) {
    this.educationalElementRepository = educationalElementRepository;
  }

  public async execute(command: UpdateEducationalElementCommand): Promise<EducationalElement> {
    const educationalElement = await this.educationalElementRepository.findOneById(command.getId());

    if (!educationalElement) {
      throw new EntityNotFoundException(`EducationalElement with id: ${command.getId()} not found`);
    }

    educationalElement.getName() !== command.getName() ? educationalElement.setName(command.getName()) : null;
    educationalElement.getTotalQuantity() !== command.getTotalQuantity()
      ? educationalElement.setTotalQuantity(command.getTotalQuantity())
      : null;
    educationalElement.getBorrowQuantity() !== command.getBorrowQuantity()
      ? educationalElement.setBorrowQuantity(command.getBorrowQuantity())
      : null;

    return await this.educationalElementRepository.persist(educationalElement);
  }
}

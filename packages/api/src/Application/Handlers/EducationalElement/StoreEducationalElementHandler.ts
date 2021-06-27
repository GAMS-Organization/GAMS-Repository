import IEducationalElementRepository from '../../../Domain/Interfaces/IEducationalElementRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreEducationalElementCommand from '../../Commands/EducationalElement/StoreEducationalElementCommand';
import EducationalElement from '../../../Domain/Entities/EducationalElement';

@injectable()
export default class StoreEducationalElementHandler {
  private educationalElementRepository: IEducationalElementRepository;
  public constructor(
    @inject(INTERFACES.IEducationalElementRepository) educationalElementRepository: IEducationalElementRepository,
  ) {
    this.educationalElementRepository = educationalElementRepository;
  }

  public async execute(command: StoreEducationalElementCommand): Promise<EducationalElement> {
    const educationalElement = new EducationalElement(
      command.getName(),
      command.getTotalQuantity(),
      command.getBorrowQuantity(),
    );
    return await this.educationalElementRepository.persist(educationalElement);
  }
}

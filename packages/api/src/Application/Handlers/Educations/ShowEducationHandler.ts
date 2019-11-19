import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IEducationRepository from '../../../Domain/Interfaces/IEducationRepository';
import Education from '../../../Domain/Entities/Education';
import ShowEducationCommand from '../../Commands/Educations/showEducationCommand';

@injectable()
export default class ShowEducationHandler {
  private educationRepository: IEducationRepository;

  public constructor(@inject(INTERFACES.IEducationRepository) educationRepository: IEducationRepository) {
    this.educationRepository = educationRepository;
  }

  public async execute(command: ShowEducationCommand): Promise<Education> {
    const education = await this.educationRepository.findOneById(command.getId());

    if (!education) {
      throw new EntityNotFoundException(`Education with id: ${command.getId()} not found`);
    }

    return education;
  }
}

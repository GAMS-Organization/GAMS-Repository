import IEducationRepository from '../../../Domain/Interfaces/IEducationRepository';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import { inject, injectable } from 'inversify';
import UpdateEducationCommand from '../../Commands/Educations/UpdateEducationsCommand';
import Education from '../../../Domain/Entities/Education';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';

@injectable()
export default class UpdateEducationHandler {
  private educationRepository: IEducationRepository;
  private rooftopperProfileRepository: IRooftopperProfileRepository;
  public constructor(
    @inject(INTERFACES.IEducationRepository) educationRepository: IEducationRepository,
    @inject(INTERFACES.IRooftopperProfileRepository) rooftopperProfileRepository: IRooftopperProfileRepository,
  ) {
    this.rooftopperProfileRepository = rooftopperProfileRepository;
    this.educationRepository = educationRepository;
  }

  public async execute(command: UpdateEducationCommand): Promise<Education> {
    const education = await this.educationRepository.findOneById(command.getId());
    if (!education) {
      throw new EntityNotFoundException(`Education with id: ${command.getId()} not found`);
    }

    if (command.getRooftopperProfileId()) {
      const relatedRooftopperProfile = await this.rooftopperProfileRepository.findOneById(
        command.getRooftopperProfileId(),
      );
      if (!relatedRooftopperProfile) {
        throw new EntityNotFoundException(`Rooftopper with id: ${command.getRooftopperProfileId()} not found`);
      }
      education.setProfile(relatedRooftopperProfile);
    }
    education.setTitle(command.getTitle());
    education.setGrade(command.getGrade());
    education.setInstitution(command.getInstitution());
    education.setStartDate(command.getStartDate());
    education.setEndDate(command.getEndDate());

    return education;
  }
}

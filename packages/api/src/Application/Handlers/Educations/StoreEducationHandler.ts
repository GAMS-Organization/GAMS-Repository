import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreEducationCommand from '../../Commands/Educations/StoreEducationCommand';
import Education from '../../../Domain/Entities/Education';
import IEducationRepository from '../../../Domain/Interfaces/IEducationRepository';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class StoreEducationHandler {
  private educationRepository: IEducationRepository;
  private rooftopperProfileRepository: IRooftopperProfileRepository;

  public constructor(
    @inject(INTERFACES.IEducationRepository) educationRepository: IEducationRepository,
    @inject(INTERFACES.IRooftopperProfileRepository) rooftopperProfileRepository: IRooftopperProfileRepository,
  ) {
    this.educationRepository = educationRepository;
    this.rooftopperProfileRepository = rooftopperProfileRepository;
  }

  public async execute(command: StoreEducationCommand): Promise<Education> {
    const relatedRooftopperProfile = await this.rooftopperProfileRepository.findOneById(
      command.getRooftopperProfileId(),
    );
    if (!relatedRooftopperProfile) {
      throw new EntityNotFoundException(`Rooftopper with id: ${command.getRooftopperProfileId()} not found`);
    }
    const education = new Education(
      command.getTitle(),
      command.getGrade(),
      command.getInstitution(),
      command.getStartDate(),
      relatedRooftopperProfile,
    );
    education.setEndDate(command.getEndDate());
    return await this.educationRepository.persist(education);
  }
}

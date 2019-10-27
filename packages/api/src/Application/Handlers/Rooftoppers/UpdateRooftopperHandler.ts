import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';
import RooftopperProfile from '../../../Domain/Entities/RooftopperProfile';
import UpdateRooftopperCommand from '../../Commands/Rooftoppers/UpdateRooftopperCommand';

@injectable()
export default class UpdateRooftopperHandler {
  private rooftopperProfileRepository: IRooftopperProfileRepository;
  public constructor(
    @inject(INTERFACES.IRooftopperProfileRepository) rooftopperProfileRepository: IRooftopperProfileRepository,
  ) {
    this.rooftopperProfileRepository = rooftopperProfileRepository;
  }

  public async execute(command: UpdateRooftopperCommand): Promise<RooftopperProfile> {
    const rooftopperProfile = await this.rooftopperProfileRepository.findOneById(command.getId());
    if (!rooftopperProfile) {
      throw new EntityNotFoundException(`Rooftopper profile with id: ${command.getId()} not found`);
    }
    rooftopperProfile.setName(command.getName());
    rooftopperProfile.setSurname(command.getSurname());
    rooftopperProfile.setProfileImage(command.getProfileImage());
    rooftopperProfile.setSlug(command.getSlug());
    rooftopperProfile.setRegistrationDate(command.getRegistrationDate());
    rooftopperProfile.setIsAvailable(command.getIsAvailable());
    rooftopperProfile.setIsWorkingOnAnotherProject(command.getIsWorkingOnAnotherProject());
    rooftopperProfile.setWorkableTime(command.getWorkableTime());
    rooftopperProfile.setOneLineDescription(command.getOneLineDescription());
    rooftopperProfile.setSummaryDescription(command.getSummaryDescription());
    rooftopperProfile.setCountry(command.getCountry());
    rooftopperProfile.setCity(command.getCity());
    rooftopperProfile.setState(command.getState());

    return await this.rooftopperProfileRepository.persist(rooftopperProfile);
  }
}

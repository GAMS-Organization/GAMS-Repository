import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreRooftopperCommand from '../../Commands/Rooftoppers/StoreRooftopperCommand';
import RooftopperProfile from '../../../Domain/Entities/RooftopperProfile';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';

@injectable()
export default class StoreRooftopperHandler {
  private rooftopperProfileRepository: IRooftopperProfileRepository;
  public constructor(
    @inject(INTERFACES.IRooftopperProfileRepository) rooftopperProfileRepository: IRooftopperProfileRepository,
  ) {
    this.rooftopperProfileRepository = rooftopperProfileRepository;
  }

  public async execute(command: StoreRooftopperCommand): Promise<RooftopperProfile> {
    const rooftopperProfile = new RooftopperProfile(
      command.getName(),
      command.getSurname(),
      command.getProfileImage(),
      command.getSlug(),
      command.getRegistrationDate(),
      command.getIsAvailable(),
      command.getIsWorkingOnAnotherProject(),
      command.getWorkableTime(),
      command.getOneLineDescription(),
      command.getSummaryDescription(),
      command.getCountry(),
      command.getCity(),
      command.getState(),
    );
    return await this.rooftopperProfileRepository.persist(rooftopperProfile);
  }
}

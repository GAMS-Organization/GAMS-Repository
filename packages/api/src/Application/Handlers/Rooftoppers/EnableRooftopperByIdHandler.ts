import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';
import RooftopperProfile from '../../../Domain/Entities/RooftopperProfile';
import { RooftopperStates } from '../../../Domain/Enums/RooftopperStates';
import EnableRooftopperCommand from '../../Commands/Rooftoppers/EnableRooftopperCommand';

@injectable()
export default class EnableRooftopperByIdHandler {
  private rooftopperProfileRepository: IRooftopperProfileRepository;

  public constructor(
    @inject(INTERFACES.IRooftopperProfileRepository) rooftopperProfileRepository: IRooftopperProfileRepository,
  ) {
    this.rooftopperProfileRepository = rooftopperProfileRepository;
  }

  public async execute(command: EnableRooftopperCommand): Promise<RooftopperProfile> {
    const rooftopperProfile = await this.rooftopperProfileRepository.findOneById(command.getId());

    if (!rooftopperProfile) {
      throw new EntityNotFoundException(`Rooftopper profile with id: ${command.getId()} not found`);
    }
    rooftopperProfile.setProfileState(RooftopperStates.rooftopper_active);
    return await this.rooftopperProfileRepository.persist(rooftopperProfile);
  }
}

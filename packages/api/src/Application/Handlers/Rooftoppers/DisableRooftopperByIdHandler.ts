import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';
import RooftopperProfile from '../../../Domain/Entities/RooftopperProfile';
import { RooftopperStates } from '../../../Domain/Enums/RooftopperStates';
import DisableRooftopperCommand from '../../Commands/Rooftoppers/DisableRooftopperCommand';

@injectable()
export default class DisableRooftopperByIdHandler {
  private rooftopperProfileRepository: IRooftopperProfileRepository;

  public constructor(
    @inject(INTERFACES.IRooftopperProfileRepository) rooftopperProfileRepository: IRooftopperProfileRepository,
  ) {
    this.rooftopperProfileRepository = rooftopperProfileRepository;
  }

  public async execute(command: DisableRooftopperCommand): Promise<RooftopperProfile> {
    const rooftopperProfile = await this.rooftopperProfileRepository.findOneById(command.getId());

    if (!rooftopperProfile) {
      throw new EntityNotFoundException(`Rooftopper profile with id: ${command.getId()} not found`);
    }
    rooftopperProfile.setProfileState(RooftopperStates.rooftopper_inactive);
    return await this.rooftopperProfileRepository.persist(rooftopperProfile);
  }
}

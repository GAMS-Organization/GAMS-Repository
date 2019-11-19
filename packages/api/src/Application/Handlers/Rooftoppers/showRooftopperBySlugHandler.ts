import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';
import ShowRooftopperBySlugCommand from '../../Commands/Rooftoppers/showRooftopperBySlugCommand';
import RooftopperProfile from '../../../Domain/Entities/RooftopperProfile';

@injectable()
export default class ShowRooftopperBySlugHandler {
  private rooftopperProfileRepository: IRooftopperProfileRepository;

  public constructor(@inject(INTERFACES.IRooftopperProfileRepository) userRepository: IRooftopperProfileRepository) {
    this.rooftopperProfileRepository = userRepository;
  }

  public async execute(command: ShowRooftopperBySlugCommand): Promise<RooftopperProfile> {
    const rooftopperProfile = await this.rooftopperProfileRepository.findOneByRooftopperSlug(command.getSlug());

    if (!rooftopperProfile) {
      throw new EntityNotFoundException(`Rooftopper with slug: ${command.getSlug()} not found`);
    }

    return rooftopperProfile;
  }
}

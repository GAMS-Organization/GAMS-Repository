import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';
import ShowRooftoppersByIdCommand from '../../Commands/Rooftoppers/ShowRooftoppersByIdCommand';
import RooftopperProfile from '../../../Domain/Entities/RooftopperProfile';

@injectable()
export default class ShowRooftoppersByIdHandler {
  private rooftopperProfileRepository: IRooftopperProfileRepository;

  public constructor(
    @inject(INTERFACES.IRooftopperProfileRepository) rooftopperProfileRepository: IRooftopperProfileRepository,
  ) {
    this.rooftopperProfileRepository = rooftopperProfileRepository;
  }

  public async execute(command: ShowRooftoppersByIdCommand): Promise<RooftopperProfile> {
    const rooftopper = await this.rooftopperProfileRepository.findOneById(command.getId());

    if (!rooftopper) {
      throw new EntityNotFoundException(`Rooftopper with id: ${command.getId()} not found`);
    }

    return rooftopper;
  }
}

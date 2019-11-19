import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IRooftopperProfileRepository from '../../../Domain/Interfaces/IRooftopperProfileRepository';
import DestroyRooftopperCommand from '../../Commands/Rooftoppers/DestroyRooftopperCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';

@injectable()
export default class DestroyRooftopperHandler {
  private rooftopperProfileRepository: IRooftopperProfileRepository;

  public constructor(
    @inject(INTERFACES.IRooftopperProfileRepository) rooftopperProfileRepository: IRooftopperProfileRepository,
  ) {
    this.rooftopperProfileRepository = rooftopperProfileRepository;
  }

  public async execute(command: DestroyRooftopperCommand): Promise<boolean> {
    const rooftopperProfile = await this.rooftopperProfileRepository.findOneById(command.getId());

    if (!rooftopperProfile) {
      throw new EntityNotFoundException(`Rooftopper profile with id: ${command.getId()} not found`);
    }
    const rooftopperWasDestroyed = await this.rooftopperProfileRepository.destroy(rooftopperProfile);

    if (!rooftopperWasDestroyed) {
      throw new CannotDeleteEntity(`Rooftopper profile with id: ${command.getId()} could not be deleted`);
    }

    return rooftopperWasDestroyed;
  }
}

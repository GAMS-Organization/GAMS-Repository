import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import IEducationRepository from '../../../Domain/Interfaces/IEducationRepository';
import DestroyEducationCommand from '../../Commands/Educations/DestroyEducationCommand';

@injectable()
export default class DestroyEducationHandler {
  private educationRepository: IEducationRepository;

  public constructor(@inject(INTERFACES.IEducationRepository) educationRepository: IEducationRepository) {
    this.educationRepository = educationRepository;
  }

  public async execute(command: DestroyEducationCommand): Promise<boolean> {
    const education = await this.educationRepository.findOneById(command.getId());

    if (!education) {
      throw new EntityNotFoundException(`Education with id: ${command.getId()} not found`);
    }
    const educationWasDestroyed = await this.educationRepository.destroy(education);

    if (!educationWasDestroyed) {
      throw new CannotDeleteEntity(`Education with id: ${command.getId()} could not be deleted`);
    }

    return educationWasDestroyed;
  }
}

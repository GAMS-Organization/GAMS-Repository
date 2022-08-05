import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IEducationalElementRepository from '../../../Domain/Interfaces/IEducationalElementRepository';
import DestroyEducationalElementCommand from '../../Commands/EducationalElement/DestroyEducationalElementCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';

@injectable()
export default class DestroyEducationalElementHandler {
  private educationalElementRepository: IEducationalElementRepository;

  public constructor(
    @inject(INTERFACES.IEducationalElementRepository) educationalElementRepository: IEducationalElementRepository,
  ) {
    this.educationalElementRepository = educationalElementRepository;
  }

  public async execute(command: DestroyEducationalElementCommand): Promise<boolean> {
    const educationalElement = await this.educationalElementRepository.findOneById(command.getId());

    if (!educationalElement) {
      throw new EntityNotFoundException(`No se encontró el artículo con id: ${command.getId()}`);
    }

    const educationalElementWasDestroyed = await this.educationalElementRepository.destroy(educationalElement);

    if (!educationalElementWasDestroyed) {
      throw new CannotDeleteEntity(`No se pudo borrar el artículo con id: ${command.getId()}`);
    }

    return educationalElementWasDestroyed;
  }
}

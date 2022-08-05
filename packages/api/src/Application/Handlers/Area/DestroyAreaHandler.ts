import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import DestroyAreaCommand from '../../Commands/Area/DestroyAreaCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import AreaServiceService from '../../../Domain/Services/AreaServiceService';

@injectable()
export default class DestroyAreaHandler {
  private areaRepository: IAreaRepository;
  private areaServiceService: AreaServiceService;

  public constructor(
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(AreaServiceService) areaServiceService: AreaServiceService,
  ) {
    this.areaRepository = areaRepository;
    this.areaServiceService = areaServiceService;
  }

  public async execute(command: DestroyAreaCommand): Promise<boolean> {
    const area = await this.areaRepository.findOneById(command.getId());

    if (!area) {
      throw new EntityNotFoundException(`No se encontró el sector con id: ${command.getId()}`);
    }

    const relationsWasDestroyed = await this.areaServiceService.safeDestroyAreaRelationsByArea(area);

    if (!relationsWasDestroyed) {
      throw new CannotDeleteEntity(
        `No se pudieron borrar los sevicios relacionadas al área con id: ${command.getId()}`,
      );
    }

    const areaWasDestroyed = await this.areaRepository.destroy(area);

    if (!areaWasDestroyed) {
      throw new CannotDeleteEntity(`No se pudo borrar el área con id: ${command.getId()}`);
    }

    return areaWasDestroyed;
  }
}

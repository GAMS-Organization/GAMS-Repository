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
      @inject(AreaServiceService) areaServiceService: AreaServiceService,)
  {
    this.areaRepository = areaRepository;
    this.areaServiceService = areaServiceService
  }

  public async execute(command: DestroyAreaCommand): Promise<boolean> {
    const area = await this.areaRepository.findOneById(command.getId());

    if (!area) {
      throw new EntityNotFoundException(`Sector with id: ${command.getId()} not found`);
    }

    const relationsWAsDestroyed = await this.areaServiceService.destroyRelationsByArea(area);

    if(!relationsWAsDestroyed){
      throw new CannotDeleteEntity(`Services relationed with the area id: ${command.getId()} could not be deleted`);
    }

    const areaWasDestroyed = await this.areaRepository.destroy(area);

    if (!areaWasDestroyed) {
      throw new CannotDeleteEntity(`Area with id: ${command.getId()} could not be deleted`);
    }

    return areaWasDestroyed;
  }
}

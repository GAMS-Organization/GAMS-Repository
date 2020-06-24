import IAreaRepository from '../../../Domain/Interfaces/IAreaRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import UpdateAreaCommand from '../../Commands/Area/UpdateAreaCommand';
import Area from '../../../Domain/Entities/Area';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import AreaServiceService from '../../../Domain/Services/AreaServiceService';

@injectable()
export default class UpdateAreaHandler {
  private areaRepository: IAreaRepository;
  private areaServiceService: AreaServiceService;

  public constructor(
    @inject(INTERFACES.IAreaRepository) areaRepository: IAreaRepository,
    @inject(AreaServiceService) areaServiceService: AreaServiceService,
  ) {
    this.areaRepository = areaRepository;
    this.areaServiceService = areaServiceService;
  }

  public async execute(command: UpdateAreaCommand): Promise<Area> {
    console.log('llega al handler');
    const area = await this.areaRepository.findOneById(command.getId());
    if (!area) {
      throw new EntityNotFoundException(`Area with id: ${command.getId()} not found`);
    }
    area.setName(command.getName());

    // ver el tema de actualizar y crear los mapas

    // area.setMap(command.getMap());
    return await this.areaServiceService.updateServices(await this.areaRepository.persist(area), command.getServices());
  }
}

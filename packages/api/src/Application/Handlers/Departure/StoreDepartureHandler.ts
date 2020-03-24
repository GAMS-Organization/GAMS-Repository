import IDepartureRepository from '../../../Domain/Interfaces/IDepartureRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreDepartureCommand from '../../Commands/Departure/StoreDepartureCommand';
import Departure from '../../../Domain/Entities/Departure';
import ConsumptionService from '../../../Domain/Services/ConsumptionService';

@injectable()
export default class StoreDepartureHandler {
  private departureRepository: IDepartureRepository;
  private consumptionService: ConsumptionService;
  public constructor(
    @inject(INTERFACES.IDepartureRepository) departureRepository: IDepartureRepository,
    @inject(ConsumptionService) consumptionService: ConsumptionService,
  ) {
    this.departureRepository = departureRepository;
    this.consumptionService = consumptionService;
  }

  public async execute(command: StoreDepartureCommand): Promise<Departure> {
    const departure = new Departure(command.getDate(), command.getObservations());

    return this.consumptionService.setConsumptionToDeparture(
      await this.departureRepository.persist(departure),
      command.getProducts(),
      command.getQuantities(),
    );
  }
}

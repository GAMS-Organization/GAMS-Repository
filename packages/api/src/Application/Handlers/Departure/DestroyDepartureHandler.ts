import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IDepartureRepository from '../../../Domain/Interfaces/IDepartureRepository';
import DestroyDepartureCommand from '../../Commands/Departure/DestroyDepartureCommand';
import CannotDeleteEntity from '../../Exceptions/CannotDeleteEntity';
import ConsumptionService from '../../../Domain/Services/ConsumptionService';
import StockDepartureService from '../../../Domain/Services/StockDepartureService';

@injectable()
export default class DestroyDepartureHandler {
  private departureRepository: IDepartureRepository;
  private consumptionService: ConsumptionService;
  private stockDepartureService: StockDepartureService;

  public constructor(
    @inject(INTERFACES.IDepartureRepository) departureRepository: IDepartureRepository,
    @inject(ConsumptionService) consumptionService: ConsumptionService,
    @inject(StockDepartureService) stockDepartureService: StockDepartureService,
  ) {
    this.departureRepository = departureRepository;
    this.consumptionService = consumptionService;
    this.stockDepartureService = stockDepartureService;
  }

  public async execute(command: DestroyDepartureCommand): Promise<boolean> {
    const departure = await this.departureRepository.findOneById(command.getId());

    if (!departure) {
      throw new EntityNotFoundException(`Departure with id: ${command.getId()} not found`);
    }
    await this.consumptionService.destroyConsumptionsFromDeparture(departure.id);
    await this.stockDepartureService.destroyStockDeparturesFromDeparture(departure.id);
    const departureWasDestroyed = await this.departureRepository.destroy(departure);

    if (!departureWasDestroyed) {
      throw new CannotDeleteEntity(`Departure with id: ${command.getId()} could not be deleted`);
    }

    return departureWasDestroyed;
  }
}

import IDepartureRepository from '../../../Domain/Interfaces/IDepartureRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import StoreDepartureCommand from '../../Commands/Departure/StoreDepartureCommand';
import Departure from '../../../Domain/Entities/Departure';
import ConsumptionService from '../../../Domain/Services/ConsumptionService';
import IStockRepository from '../../../Domain/Interfaces/IStockRepository';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

@injectable()
export default class StoreDepartureHandler {
  private departureRepository: IDepartureRepository;
  private consumptionService: ConsumptionService;
  private stockRepository: IStockRepository;
  public constructor(
    @inject(INTERFACES.IDepartureRepository) departureRepository: IDepartureRepository,
    @inject(INTERFACES.IStockRepository) stockRepository: IStockRepository,
    @inject(ConsumptionService) consumptionService: ConsumptionService,
  ) {
    this.departureRepository = departureRepository;
    this.stockRepository = stockRepository;
    this.consumptionService = consumptionService;
  }

  public async execute(command: StoreDepartureCommand): Promise<Departure> {
    //@ts-ignore
    const departure = new Departure(command.getDate(), command.getObservations());

    for (const product of command.getProducts()) {
      const stock = await this.stockRepository.findOneByStockProduct(product);
      if (!stock) {
        throw new EntityNotFoundException(`Stock with product ID: ${product} not found`);
      }
    }

    return this.consumptionService.setConsumptionToDeparture(
      await this.departureRepository.persist(departure),
      command.getProducts(),
      command.getQuantities(),
    );
  }
}

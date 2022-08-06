import IConsumptionRepository from '../Interfaces/IConsumptionRepository';
import { inject, injectable } from 'inversify';
import IProductRepository from '../Interfaces/IProductRepository';
import { INTERFACES } from '../../Infrastructure/DI/interfaces.types';
import Consumption from '../Entities/Consumption';
import Departure from '../Entities/Departure';
import StockDepartureService from './StockDepartureService';
import CannotDeleteEntity from '../../Application/Exceptions/CannotDeleteEntity';
import WorkOrder from '../Entities/WorkOrder';

@injectable()
export default class ConsumptionService {
  private consumptionRepository: IConsumptionRepository;
  private productRepository: IProductRepository;
  private stockDepartureService: StockDepartureService;

  public constructor(
    @inject(INTERFACES.IProductRepository) productRepository: IProductRepository,
    @inject(INTERFACES.IConsumptionRepository) consumptionRepository: IConsumptionRepository,
    @inject(StockDepartureService) stockDepartureService: StockDepartureService,
  ) {
    this.productRepository = productRepository;
    this.consumptionRepository = consumptionRepository;
    this.stockDepartureService = stockDepartureService;
  }

  public async setConsumptionToDeparture(
    departure: Departure,
    productsId: number[],
    quantities: number[],
    workOrder?: WorkOrder,
  ): Promise<Departure> {
    const products = await this.productRepository.findAll();
    for (const product of products) {
      const productId = product.getId();
      if (productsId.includes(productId)) {
        let index = productsId.indexOf(productId);
        let quantity = quantities[index];
        const consumption = new Consumption(quantity, product, departure);
        await this.consumptionRepository.persist(consumption);
        await this.stockDepartureService.setStockDeparture(departure, product, quantity);
      }
    }
    if (workOrder) {
      departure.setWorkOrder(workOrder);
    }
    return departure;
  }

  public async destroyConsumptionsFromDeparture(departureId: number): Promise<void> {
    const consumptions = await this.consumptionRepository.findByDepartureId(departureId);
    for (const consumption of consumptions) {
      try {
        await this.stockDepartureService.updateQuantityStock(consumption.getProduct(), consumption.getQuantity());
        await this.consumptionRepository.destroy(consumption);
      } catch (e) {
        throw new CannotDeleteEntity(`No se pudo borrar el consumo con id: ${consumption.getId()}`);
      }
    }
  }
}

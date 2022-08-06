import IWorkOrderRepository from '../../../Domain/Interfaces/IWorkOrderRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import CompleteWorkOrderCommand from '../../Commands/WorkOrder/CompleteWorkOrderCommand';
import WorkOrder from '../../../Domain/Entities/WorkOrder';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import { STATE } from '../../../API/Http/Enums/WorkOrder';
import Departure from '../../../Domain/Entities/Departure';
import IDepartureRepository from '../../../Domain/Interfaces/IDepartureRepository';
import ConsumptionService from '../../../Domain/Services/ConsumptionService';

@injectable()
export default class CompleteWorkOrderHandler {
  private workOrderRepository: IWorkOrderRepository;
  private consumptionService: ConsumptionService;
  private departureRepository: IDepartureRepository;
  public constructor(
    @inject(INTERFACES.IWorkOrderRepository) workOrderRepository: IWorkOrderRepository,
    @inject(ConsumptionService) consumptionService: ConsumptionService,
    @inject(INTERFACES.IDepartureRepository) departureRepository: IDepartureRepository,
  ) {
    this.workOrderRepository = workOrderRepository;
    this.departureRepository = departureRepository;
    this.consumptionService = consumptionService;
  }

  public async execute(command: CompleteWorkOrderCommand): Promise<WorkOrder> {
    let workOrder = await this.workOrderRepository.findOneById(command.getId());
    if (!workOrder) {
      throw new EntityNotFoundException(`No se encontró la orden de trabajo con id: ${command.getId()}`);
    }
    //@ts-ignore
    workOrder.setRealizationDate(command.getRealizationDate());
    workOrder.setState(STATE.FINISHED);
    workOrder.setTaskDescription(command.getTaskDescription());

    workOrder = await this.workOrderRepository.persist(workOrder);

    if (command.getProductsId().length !== 0) {
      let departure = new Departure(
        //@ts-ignore
        command.getRealizationDate(),
        `Consumido por una orden de trabajo`,
      );

      departure = await this.departureRepository.persist(departure);

      departure = await this.consumptionService.setConsumptionToDeparture(
        departure,
        command.getProductsId(),
        command.getQuantities(),
        workOrder,
      );

      await this.departureRepository.persist(departure);
    }

    workOrder = await this.workOrderRepository.findOneById(command.getId());

    return workOrder;
  }
}

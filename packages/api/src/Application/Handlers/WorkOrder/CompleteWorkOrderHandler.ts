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
      throw new EntityNotFoundException(`WorkOrder with id: ${command.getId()} not found`);
    }
    workOrder.setRealizationDate(command.getRealizationDate());
    workOrder.setState(STATE.FINISHED);
    workOrder.setTaskDescription(command.getTaskDescription());

    workOrder = await this.workOrderRepository.persist(workOrder);

    const departure = new Departure(
      command.getRealizationDate(),
      `Consumido por la órden de trabajo con id ${command.getId()}`,
    );

    await this.consumptionService.setConsumptionToDeparture(
      await this.departureRepository.persist(departure),
      command.getProductsId(),
      command.getQuantities(),
      workOrder,
    );

    return workOrder;
  }
}

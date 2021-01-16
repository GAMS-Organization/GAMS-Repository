import IWorkOrderRepository from '../../../Domain/Interfaces/IWorkOrderRepository';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/interfaces.types';
import AssignWorkOrderCommand from '../../Commands/WorkOrder/AssignWorkOrderCommand';
import WorkOrder from '../../../Domain/Entities/WorkOrder';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import IUserRepository from '../../../Domain/Interfaces/IUserRepository';
import WorkOrderService from '../../../Domain/Services/WorkOrderService';
import { STATE } from '../../../API/Http/Enums/WorkOrder';
import MailerService from '../../../Domain/Services/Mailer/MailerService';
import { mailTitles } from '../../../Domain/Enums/MailTitlesAndMessages';

@injectable()
export default class AssignWorkOrderHandler {
  private workOrderRepository: IWorkOrderRepository;
  private userRepository: IUserRepository;
  private workOrderService: WorkOrderService;
  private mailerService: MailerService;
  public constructor(
    @inject(INTERFACES.IWorkOrderRepository) workOrderRepository: IWorkOrderRepository,
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
    @inject(WorkOrderService) workOrderService: WorkOrderService,
    @inject(MailerService) mailerService: MailerService,
  ) {
    this.workOrderRepository = workOrderRepository;
    this.userRepository = userRepository;
    this.workOrderService = workOrderService;
    this.mailerService = mailerService;
  }

  public async execute(command: AssignWorkOrderCommand): Promise<WorkOrder> {
    const workOrder = await this.workOrderRepository.findOneById(command.getId());
    if (!workOrder) {
      throw new EntityNotFoundException(`WorkOrder with id: ${command.getId()} not found`);
    }
    workOrder.setStartDate(command.getStartDate());
    workOrder.setState(STATE.ASSIGNED);

    const workers = [];
    for (const workerId of command.getWorkersId()) {
      const worker = await this.userRepository.findOneById(workerId);
      if (!worker) {
        throw new EntityNotFoundException(`WorkerUser with id: ${workerId} not found`);
      }
      workers.push(worker);
    }

    await this.mailerService.sendEmail(mailTitles.workOrderAssigned, workOrder.getComment(), workers);

    return await this.workOrderService.updateWorkers(await this.workOrderRepository.persist(workOrder), workers);
  }
}

import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import CompleteWorkOrderAdapter from '../../Adapters/WorkOrder/CompleteWorkOrderAdapter';
import CompleteWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/CompleteWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';
import IUserRepository from '../../../../Domain/Interfaces/IUserRepository';
import { INTERFACES } from '../../../../Infrastructure/DI/interfaces.types';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';

@injectable()
export default class CompleteWorkOrderAction {
  private adapter: CompleteWorkOrderAdapter;
  private handler: CompleteWorkOrderHandler;
  private mailerService: MailerService;
  private userRepository: IUserRepository;

  public constructor(
    adapter: CompleteWorkOrderAdapter,
    handler: CompleteWorkOrderHandler,
    @inject(MailerService) mailerService: MailerService,
    @inject(INTERFACES.IUserRepository) userRepository: IUserRepository,
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.mailerService = mailerService;
    this.userRepository = userRepository;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const admins = await this.userRepository.findByRole('admin');

    const userId = admins.map(user => {
      return user.getId();
    });

    await this.mailerService.sendEmail(mailTitles.workOrderCompleted, result, 'completeWorkOrder', userId);

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'CompleteWorkOrderAction: WorkOrder has been updated'));
  }
}

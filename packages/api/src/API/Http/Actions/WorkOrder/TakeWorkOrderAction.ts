import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import TakeWorkOrderAdapter from '../../Adapters/WorkOrder/TakeWorkOrderAdapter';
import TakeWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/TakeWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';
import IUserRepository from '../../../../Domain/Interfaces/IUserRepository';
import { INTERFACES } from '../../../../Infrastructure/DI/interfaces.types';

@injectable()
export default class TakeWorkOrderAction {
  private adapter: TakeWorkOrderAdapter;
  private handler: TakeWorkOrderHandler;
  private mailerService: MailerService;
  private userRepository: IUserRepository;

  public constructor(
    adapter: TakeWorkOrderAdapter,
    handler: TakeWorkOrderHandler,
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

    await this.mailerService.sendEmail(mailTitles.workOrderTaken, result, 'takeWorkOrder', userId);

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'TakeWorkOrderAction: WorkOrder has been updated'));
  }
}

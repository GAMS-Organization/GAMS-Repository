import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import TakeWorkOrderAdapter from '../../Adapters/WorkOrder/TakeWorkOrderAdapter';
import TakeWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/TakeWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';

@injectable()
export default class TakeWorkOrderAction {
  private adapter: TakeWorkOrderAdapter;
  private handler: TakeWorkOrderHandler;
  private mailerService: MailerService;

  public constructor(
    adapter: TakeWorkOrderAdapter,
    handler: TakeWorkOrderHandler,
    @inject(MailerService) mailerService: MailerService,
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.mailerService = mailerService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    await this.mailerService.sendEmail(mailTitles.workOrderTaken, result, 'takeWorkOrder', null);

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'TakeWorkOrderAction: WorkOrder has been updated'));
  }
}

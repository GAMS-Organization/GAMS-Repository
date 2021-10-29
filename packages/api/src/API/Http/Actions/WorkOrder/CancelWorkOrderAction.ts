import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import CancelWorkOrderAdapter from '../../Adapters/WorkOrder/CancelWorkOrderAdapter';
import CancelWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/CancelWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';

@injectable()
export default class CancelWorkOrderAction {
  private adapter: CancelWorkOrderAdapter;
  private handler: CancelWorkOrderHandler;
  private mailerService: MailerService;

  public constructor(
    adapter: CancelWorkOrderAdapter,
    handler: CancelWorkOrderHandler,
    @inject(MailerService) mailerService: MailerService,
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.mailerService = mailerService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    await this.mailerService.sendEmail(mailTitles.workOrderCancelled, result, 'cancelWorkOrder');

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'CancelWorkOrderAction: WorkOrder has been updated'));
  }
}

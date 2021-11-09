import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import CompleteWorkOrderAdapter from '../../Adapters/WorkOrder/CompleteWorkOrderAdapter';
import CompleteWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/CompleteWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';

@injectable()
export default class CompleteWorkOrderAction {
  private adapter: CompleteWorkOrderAdapter;
  private handler: CompleteWorkOrderHandler;
  private mailerService: MailerService;

  public constructor(
    adapter: CompleteWorkOrderAdapter,
    handler: CompleteWorkOrderHandler,
    @inject(MailerService) mailerService: MailerService,
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.mailerService = mailerService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    await this.mailerService.sendEmail(mailTitles.workOrderCompleted, result, 'completeWorkOrder', null);

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'CompleteWorkOrderAction: WorkOrder has been updated'));
  }
}

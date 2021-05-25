import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import AssignWorkOrderAdapter from '../../Adapters/WorkOrder/AssignWorkOrderAdapter';
import AssignWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/AssignWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';

@injectable()
export default class AssignWorkOrderAction {
  private adapter: AssignWorkOrderAdapter;
  private handler: AssignWorkOrderHandler;
  private mailerService: MailerService;

  public constructor(
    adapter: AssignWorkOrderAdapter,
    handler: AssignWorkOrderHandler,
    @inject(MailerService) mailerService: MailerService,
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.mailerService = mailerService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    await this.mailerService.sendEmail(mailTitles.workOrderAssigned, result, 'assignWorkOrder', command.getWorkersId());

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'AssignWorkOrderAction: WorkOrder has been updated'));
  }
}

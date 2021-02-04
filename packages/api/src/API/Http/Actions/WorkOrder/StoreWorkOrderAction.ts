import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreWorkOrderAdapter from '../../Adapters/WorkOrder/StoreWorkOrderAdapter';
import StoreWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/StoreWorkOrderHandler';
import StoreWorkOrderPresenter from '../../Presenters/WorkOrder/StoreWorkOrderPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';

@injectable()
export default class StoreWorkOrderAction {
  private adapter: StoreWorkOrderAdapter;
  private handler: StoreWorkOrderHandler;
  private mailerService: MailerService;

  public constructor(
    adapter: StoreWorkOrderAdapter,
    handler: StoreWorkOrderHandler,
    @inject(MailerService) mailerService: MailerService,
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.mailerService = mailerService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    await this.mailerService.sendEmail(mailTitles.workOrderCreated, result, 'newWorkORder');

    const presenter = new StoreWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreWorkOrderAction: WorkOrder has been created'));
  }
}

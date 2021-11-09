import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreElementRequestAdapter from '../../Adapters/ElementRequest/StoreElementRequestAdapter';
import StoreElementRequestHandler from '../../../../Application/Handlers/ElementRequest/StoreElementRequestHandler';
import StoreElementRequestPresenter from '../../Presenters/ElementRequest/StoreElementRequestPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';

@injectable()
export default class StoreElementRequestAction {
  private adapter: StoreElementRequestAdapter;
  private handler: StoreElementRequestHandler;
  private mailerService: MailerService;

  public constructor(
    adapter: StoreElementRequestAdapter,
    handler: StoreElementRequestHandler,
    @inject(MailerService) mailerService: MailerService,
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.mailerService = mailerService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    await this.mailerService.sendToolAndElementRequestEmail(mailTitles.elementRequest, result);

    const presenter = new StoreElementRequestPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreElementRequestAction: ElementRequest has been created'));
  }
}

import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreToolRequestAdapter from '../../Adapters/ToolRequest/StoreToolRequestAdapter';
import StoreToolRequestHandler from '../../../../Application/Handlers/ToolRequest/StoreToolRequestHandler';
import StoreToolRequestPresenter from '../../Presenters/ToolRequest/StoreToolRequestPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';

@injectable()
export default class StoreToolRequestAction {
  private adapter: StoreToolRequestAdapter;
  private handler: StoreToolRequestHandler;
  private mailerService: MailerService;

  public constructor(
    adapter: StoreToolRequestAdapter,
    handler: StoreToolRequestHandler,
    @inject(MailerService) mailerService: MailerService,
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.mailerService = mailerService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    await this.mailerService.sendToolAndElementRequestEmail(mailTitles.toolRequest, result);

    const presenter = new StoreToolRequestPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreToolRequestAction: ToolRequest has been created'));
  }
}

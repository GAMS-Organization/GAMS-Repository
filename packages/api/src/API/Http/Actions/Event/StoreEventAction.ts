import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreEventAdapter from '../../Adapters/Event/StoreEventAdapter';
import StoreEventHandler from '../../../../Application/Handlers/Event/StoreEventHandler';
import StoreEventPresenter from '../../Presenters/Event/StoreEventPresenter';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import { mailTitles } from '../../../../Domain/Enums/MailTitlesAndMessages';
import MailerService from '../../../../Domain/Services/Mailer/MailerService';

@injectable()
export default class StoreEventAction {
  private adapter: StoreEventAdapter;
  private handler: StoreEventHandler;
  private mailerService: MailerService;

  public constructor(
    adapter: StoreEventAdapter,
    handler: StoreEventHandler,
    @inject(MailerService) mailerService: MailerService,
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.mailerService = mailerService;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    await this.mailerService.sendEventEmail(mailTitles.event, result);

    const presenter = new StoreEventPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreEventAction: Event has been created'));
  }
}

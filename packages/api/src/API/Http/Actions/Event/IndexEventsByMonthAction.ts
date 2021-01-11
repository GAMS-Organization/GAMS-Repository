import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import IndexEventsByMonthAdapter from '../../Adapters/Event/IndexEventsByMonthAdapter';
import IndexEventsByMonthHandler from '../../../../Application/Handlers/Event/IndexEventsByMonthHandler';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import GetAllEventsPresenter from '../../Presenters/Event/GetAllEventsPresenter';

@injectable()
export default class IndexEventsByMonthAction {
  private adapter: IndexEventsByMonthAdapter;
  private handler: IndexEventsByMonthHandler;

  public constructor(adapter: IndexEventsByMonthAdapter, handler: IndexEventsByMonthHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetAllEventsPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'IndexEventsByMonthAction: Events has been retrieved'));
  }
}

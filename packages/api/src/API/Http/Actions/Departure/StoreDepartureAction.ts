import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreDepartureAdapter from '../../Adapters/Departure/StoreDepartureAdapter';
import StoreDeparturekHandler from '../../../../Application/Handlers/Departure/StoreDepartureHandler';
import StoreDeparturePresenter from '../../Presenters/Departure/StoreDeparturePresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreDepartureAction {
  private adapter: StoreDepartureAdapter;
  private handler: StoreDeparturekHandler;

  public constructor(adapter: StoreDepartureAdapter, handler: StoreDeparturekHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreDeparturePresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreDepartureAction: Departure has been created'));
  }
}

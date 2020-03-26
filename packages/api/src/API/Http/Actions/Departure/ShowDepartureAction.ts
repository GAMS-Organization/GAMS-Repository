import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowDepartureAdapter from '../../Adapters/Departure/ShowDepartureAdapter';
import ShowDepartureHandler from '../../../../Application/Handlers/Departure/ShowDepartureHandler';
import GetDeparturePresenter from '../../Presenters/Departure/GetDeparturePresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class ShowDepartureAction {
  private adapter: ShowDepartureAdapter;
  private handler: ShowDepartureHandler;

  public constructor(adapter: ShowDepartureAdapter, handler: ShowDepartureHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetDeparturePresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowDepartureAction: Departure has been retrieved'));
  }
}

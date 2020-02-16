import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowAreaBySectorAdapter from '../../Adapters/Area/ShowAreaBySectorAdapter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import ShowAreaBySectorHandler from '../../../../Application/Handlers/Area/ShowAreaBySectorHandler';
import GetAllAreasPresenter from '../../Presenters/Area/GetAllAreasPresenter';

@injectable()
export default class ShowAreaBySectorAction {
  private adapter: ShowAreaBySectorAdapter;
  private handler: ShowAreaBySectorHandler;

  public constructor(adapter: ShowAreaBySectorAdapter, handler: ShowAreaBySectorHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetAllAreasPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowAreaAction: Area profile has been retrieved'));
  }
}

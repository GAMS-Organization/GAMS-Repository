import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowServiceAdapter from '../../Adapters/Service/ShowServiceAdapter';
import ShowServiceHandler from '../../../../Application/Handlers/Service/ShowServiceHandler';
import GetServicePresenter from '../../Presenters/Service/GetServicePresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class ShowServiceAction {
  private adapter: ShowServiceAdapter;
  private handler: ShowServiceHandler;

  public constructor(adapter: ShowServiceAdapter, handler: ShowServiceHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetServicePresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowServiceAction: Service has been retrieved'));
  }
}

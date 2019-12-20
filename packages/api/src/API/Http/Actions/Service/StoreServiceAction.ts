import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreServiceAdapter from '../../Adapters/Service/StoreServiceAdapter';
import StoreServiceHandler from '../../../../Application/Handlers/Service/StoreServiceHandler';
import StoreServicePresenter from '../../Presenters/Service/StoreServicePresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreServiceAction {
  private adapter: StoreServiceAdapter;
  private handler: StoreServiceHandler;

  public constructor(adapter: StoreServiceAdapter, handler: StoreServiceHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreServicePresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreServiceAction: Service has been created'));
  }
}

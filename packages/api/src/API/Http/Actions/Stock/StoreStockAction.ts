import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreStockAdapter from '../../Adapters/Stock/StoreStockAdapter';
import StoreStockHandler from '../../../../Application/Handlers/Stock/StoreStockHandler';
import StoreStockPresenter from '../../Presenters/Stock/StoreStockPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreUsersAction {
  private adapter: StoreStockAdapter;
  private handler: StoreStockHandler;

  public constructor(adapter: StoreStockAdapter, handler: StoreStockHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreStockPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreStockAction: Stock has been created'));
  }
}

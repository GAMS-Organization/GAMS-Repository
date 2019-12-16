import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateStockAdapter from '../../Adapters/Stock/UpdateStockAdapter';
import UpdateStockHandler from '../../../../Application/Handlers/Stock/UpdateStockHandler';
import UpdateStockPresenter from '../../Presenters/Stock/UpdateStockPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateStockAction {
  private adapter: UpdateStockAdapter;
  private handler: UpdateStockHandler;

  public constructor(adapter: UpdateStockAdapter, handler: UpdateStockHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateStockPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateStockAction: Stock has been updated'));
  }
}

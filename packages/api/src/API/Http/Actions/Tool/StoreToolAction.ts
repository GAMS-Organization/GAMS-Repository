import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreToolAdapter from '../../Adapters/Tool/StoreToolAdapter';
import StoreToolHandler from '../../../../Application/Handlers/Tool/StoreToolHandler';
import StoreToolPresenter from '../../Presenters/Tool/StoreToolPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreToolAction {
  private adapter: StoreToolAdapter;
  private handler: StoreToolHandler;

  public constructor(adapter: StoreToolAdapter, handler: StoreToolHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreToolPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreToolAction: Tool has been created'));
  }
}

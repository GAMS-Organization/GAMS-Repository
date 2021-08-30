import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreToolRequestAdapter from '../../Adapters/ToolRequest/StoreToolRequestAdapter';
import StoreToolRequestHandler from '../../../../Application/Handlers/ToolRequest/StoreToolRequestHandler';
import StoreToolRequestPresenter from '../../Presenters/ToolRequest/StoreToolRequestPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreToolRequestAction {
  private adapter: StoreToolRequestAdapter;
  private handler: StoreToolRequestHandler;

  public constructor(adapter: StoreToolRequestAdapter, handler: StoreToolRequestHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreToolRequestPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreToolRequestAction: ToolRequest has been created'));
  }
}

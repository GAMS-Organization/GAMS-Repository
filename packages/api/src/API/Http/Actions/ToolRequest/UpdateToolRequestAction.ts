import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateToolRequestAdapter from '../../Adapters/ToolRequest/UpdateToolRequestAdapter';
import UpdateToolRequestHandler from '../../../../Application/Handlers/ToolRequest/UpdateToolRequestHandler';
import UpdateToolRequestPresenter from '../../Presenters/ToolRequest/UpdateToolRequestPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateToolRequestAction {
  private adapter: UpdateToolRequestAdapter;
  private handler: UpdateToolRequestHandler;

  public constructor(adapter: UpdateToolRequestAdapter, handler: UpdateToolRequestHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateToolRequestPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateToolRequestAction: ToolRequest has been updated'));
  }
}

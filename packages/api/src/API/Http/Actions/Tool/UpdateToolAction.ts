import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateToolAdapter from '../../Adapters/Tool/UpdateToolAdapter';
import UpdateToolHandler from '../../../../Application/Handlers/Tool/UpdateToolHandler';
import UpdateToolPresenter from '../../Presenters/Tool/UpdateToolPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateToolAction {
  private adapter: UpdateToolAdapter;
  private handler: UpdateToolHandler;

  public constructor(adapter: UpdateToolAdapter, handler: UpdateToolHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateToolPresenter(result);

    return response.status(HTTP_CODES.OK).json(success(presenter.getData(), 'UpdateToolAction: Tool has been updated'));
  }
}

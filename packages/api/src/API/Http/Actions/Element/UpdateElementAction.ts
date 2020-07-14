import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateElementAdapter from '../../Adapters/Element/UpdateElementAdapter';
import UpdateElementHandler from '../../../../Application/Handlers/Element/UpdateElementHandler';
import UpdateElementPresenter from '../../Presenters/Element/UpdateElementPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateElementAction {
  private adapter: UpdateElementAdapter;
  private handler: UpdateElementHandler;

  public constructor(adapter: UpdateElementAdapter, handler: UpdateElementHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateElementPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateElementAction: Element has been updated'));
  }
}

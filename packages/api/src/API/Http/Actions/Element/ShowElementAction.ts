import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowElementAdapter from '../../Adapters/Element/ShowElementAdapter';
import ShowElementHandler from '../../../../Application/Handlers/Element/ShowElementHandler';
import GetElementPresenter from '../../Presenters/Element/GetElementPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class ShowElementAction {
  private adapter: ShowElementAdapter;
  private handler: ShowElementHandler;

  public constructor(adapter: ShowElementAdapter, handler: ShowElementHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetElementPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowElementAction: Element has been retrieved'));
  }
}

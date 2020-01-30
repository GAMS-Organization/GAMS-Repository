import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreElementAdapter from '../../Adapters/Element/StoreElementAdapter';
import StoreElementHandler from '../../../../Application/Handlers/Element/StoreElementHandler';
import StoreElementPresenter from '../../Presenters/Element/StoreElementPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreElementAction {
  private adapter: StoreElementAdapter;
  private handler: StoreElementHandler;

  public constructor(adapter: StoreElementAdapter, handler: StoreElementHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreElementPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreElementAction: Element has been created'));
  }
}

import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreAreaAdapter from '../../Adapters/Area/StoreAreaAdapter';
import StoreAreaHandler from '../../../../Application/Handlers/Area/StoreAreaHandler';
import StoreAreaPresenter from '../../Presenters/Area/StoreAreaPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreAreaAction {
  private adapter: StoreAreaAdapter;
  private handler: StoreAreaHandler;

  public constructor(adapter: StoreAreaAdapter, handler: StoreAreaHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreAreaPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreAreaAction: Area has been created'));
  }
}

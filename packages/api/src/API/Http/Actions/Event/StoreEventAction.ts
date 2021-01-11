import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreEventAdapter from '../../Adapters/Event/StoreEventAdapter';
import StoreEventHandler from '../../../../Application/Handlers/Event/StoreEventHandler';
import StoreEventPresenter from '../../Presenters/Event/StoreEventPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreEventAction {
  private adapter: StoreEventAdapter;
  private handler: StoreEventHandler;

  public constructor(adapter: StoreEventAdapter, handler: StoreEventHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreEventPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreEventAction: Event has been created'));
  }
}

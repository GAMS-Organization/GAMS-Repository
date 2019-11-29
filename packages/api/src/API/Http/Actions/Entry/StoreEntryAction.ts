import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreEntryAdapter from '../../Adapters/Entry/StoreEntryAdapter';
import StoreEntrykHandler from '../../../../Application/Handlers/Entry/StoreEntryHandler';
import StoreEntryPresenter from '../../Presenters/Entry/StoreEntryPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreEntryAction {
  private adapter: StoreEntryAdapter;
  private handler: StoreEntrykHandler;

  public constructor(adapter: StoreEntryAdapter, handler: StoreEntrykHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreEntryPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreEntryAction: Entry has been created'));
  }
}

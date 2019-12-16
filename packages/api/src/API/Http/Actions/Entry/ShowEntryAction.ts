import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowEntryAdapter from '../../Adapters/Entry/ShowEntryAdapter';
import ShowEntryHandler from '../../../../Application/Handlers/Entry/ShowEntryHandler';
import GetEntryPresenter from '../../Presenters/Entry/GetEntryPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class ShowEntryAction {
  private adapter: ShowEntryAdapter;
  private handler: ShowEntryHandler;

  public constructor(adapter: ShowEntryAdapter, handler: ShowEntryHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetEntryPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowEntryAction: Entry has been retrieved'));
  }
}

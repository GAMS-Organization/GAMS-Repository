import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreSectorAdapter from '../../Adapters/Sector/StoreSectorAdapter';
import StoreSectorHandler from '../../../../Application/Handlers/Sector/StoreSectorHandler';
import StoreSectorPresenter from '../../Presenters/Sector/StoreSectorPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreSectorAction {
  private adapter: StoreSectorAdapter;
  private handler: StoreSectorHandler;

  public constructor(adapter: StoreSectorAdapter, handler: StoreSectorHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreSectorPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreSectorAction: Sector has been created'));
  }
}

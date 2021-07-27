import { Request, Response } from 'express';
// import { success } from '../../../../utils/customResponse';
import ShowSectorAdapter from '../../Adapters/Sector/ShowSectorAdapter';
import ShowSectorHandler from '../../../../Application/Handlers/Sector/ShowSectorHandler';
import GetSectorPresenter from '../../Presenters/Sector/GetSectorPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import { success } from '../../../../utils/customResponse';

@injectable()
export default class ShowSectorAction {
  private adapter: ShowSectorAdapter;
  private handler: ShowSectorHandler;

  public constructor(adapter: ShowSectorAdapter, handler: ShowSectorHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetSectorPresenter(result);

    // @ts-ignore
    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowSectorAction: Sector has been retrieved'));
  }
}

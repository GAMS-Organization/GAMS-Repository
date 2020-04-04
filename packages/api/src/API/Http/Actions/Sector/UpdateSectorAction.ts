import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateSectorAdapter from '../../Adapters/Sector/UpdateSectorAdapter';
import UpdateSectorHandler from '../../../../Application/Handlers/Sector/UpdateSectorHandler';
import UpdateSectorPresenter from '../../Presenters/Sector/UpdateSectorPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateSectorAction {
  private adapter: UpdateSectorAdapter;
  private handler: UpdateSectorHandler;

  public constructor(adapter: UpdateSectorAdapter, handler: UpdateSectorHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateSectorPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateSectorAction: Sector has been updated'));
  }
}

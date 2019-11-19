import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import StoreRooftopperPresenter from '../../Presenters/Rooftoppers/StoreRooftopperPresenter';
import UpdateRooftopperAdapter from '../../Adapters/Rooftoppers/UpdateRooftopperAdapter';
import UpdateRooftopperHandler from '../../../../Application/Handlers/Rooftoppers/UpdateRooftopperHandler';

@injectable()
export default class UpdateUsersAction {
  private adapter: UpdateRooftopperAdapter;
  private handler: UpdateRooftopperHandler;

  public constructor(adapter: UpdateRooftopperAdapter, handler: UpdateRooftopperHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = await this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreRooftopperPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateRooftopperAction: Rooftopper profile has been updated'));
  }
}

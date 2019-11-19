import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowRooftopperBySlugAdapter from '../../Adapters/Rooftoppers/showRooftopperBySlugAdapter';
import ShowRooftopperBySlugHandler from '../../../../Application/Handlers/Rooftoppers/showRooftopperBySlugHandler';
import StoreRooftopperPresenter from '../../Presenters/Rooftoppers/StoreRooftopperPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class ShowRooftopperBySlugAction {
  private adapter: ShowRooftopperBySlugAdapter;
  private handler: ShowRooftopperBySlugHandler;

  public constructor(adapter: ShowRooftopperBySlugAdapter, handler: ShowRooftopperBySlugHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreRooftopperPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowRooftoppersAction: Rooftopper profile has been retrieved'));
  }
}

import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreRooftopperAdapter from '../../Adapters/Rooftoppers/StoreRooftopperAdapter';
import StoreRooftopperHandler from '../../../../Application/Handlers/Rooftoppers/StoreRooftopperHandler';
import StoreRooftopperPresenter from '../../Presenters/Rooftoppers/StoreRooftopperPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreRooftopperAction {
  private adapter: StoreRooftopperAdapter;
  private handler: StoreRooftopperHandler;

  public constructor(adapter: StoreRooftopperAdapter, handler: StoreRooftopperHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = await this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreRooftopperPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreRooftopperAction: Rooftopper has been created'));
  }
}

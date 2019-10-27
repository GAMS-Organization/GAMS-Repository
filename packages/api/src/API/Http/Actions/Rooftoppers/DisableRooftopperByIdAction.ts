import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreRooftopperPresenter from '../../Presenters/Rooftoppers/StoreRooftopperPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DisableRooftopperByIdAdapter from '../../Adapters/Rooftoppers/DisableRooftopperByIdAdapter';
import DisableRooftopperByIdHandler from '../../../../Application/Handlers/Rooftoppers/DisableRooftopperByIdHandler';

@injectable()
export default class DisableRooftopperByIdAction {
  private adapter: DisableRooftopperByIdAdapter;
  private handler: DisableRooftopperByIdHandler;

  public constructor(adapter: DisableRooftopperByIdAdapter, handler: DisableRooftopperByIdHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreRooftopperPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'DisableRooftopperByIdAction: Rooftopper profile has been disabled'));
  }
}

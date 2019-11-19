import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreRooftopperPresenter from '../../Presenters/Rooftoppers/StoreRooftopperPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import EnableRooftopperByIdAdapter from '../../Adapters/Rooftoppers/EnableRooftopperByIdAdapter';
import EnableRooftopperByIdHandler from '../../../../Application/Handlers/Rooftoppers/EnableRooftopperByIdHandler';

@injectable()
export default class EnableRooftopperByIdAction {
  private adapter: EnableRooftopperByIdAdapter;
  private handler: EnableRooftopperByIdHandler;

  public constructor(adapter: EnableRooftopperByIdAdapter, handler: EnableRooftopperByIdHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreRooftopperPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'EnableRooftopperByIdAction: Rooftopper profile has been enabled'));
  }
}

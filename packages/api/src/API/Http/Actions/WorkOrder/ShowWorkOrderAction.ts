import { Request, Response } from 'express';
// import { success } from '../../../../utils/customResponse';
import ShowWorkOrderAdapter from '../../Adapters/WorkOrder/ShowWorkOrderAdapter';
import ShowWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/ShowWorkOrderHandler';
import GetWorkOrderPresenter from '../../Presenters/WorkOrder/GetWorkOrderPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import { success } from '../../../../utils/customResponse';

@injectable()
export default class ShowWorkOrderAction {
  private adapter: ShowWorkOrderAdapter;
  private handler: ShowWorkOrderHandler;

  public constructor(adapter: ShowWorkOrderAdapter, handler: ShowWorkOrderHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetWorkOrderPresenter(result);

    // @ts-ignore
    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowWorkOrderAction: Work order has been retrieved'));
  }
}

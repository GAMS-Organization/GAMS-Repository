import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreWorkOrderAdapter from '../../Adapters/WorkOrder/StoreWorkOrderAdapter';
import StoreWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/StoreWorkOrderHandler';
import StoreWorkOrderPresenter from '../../Presenters/WorkOrder/StoreWorkOrderPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreWorkOrderAction {
  private adapter: StoreWorkOrderAdapter;
  private handler: StoreWorkOrderHandler;

  public constructor(adapter: StoreWorkOrderAdapter, handler: StoreWorkOrderHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreWorkOrderAction: WorkOrder has been created'));
  }
}

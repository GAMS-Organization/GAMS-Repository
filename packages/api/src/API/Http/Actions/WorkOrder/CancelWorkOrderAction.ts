import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import CancelWorkOrderAdapter from '../../Adapters/WorkOrder/CancelWorkOrderAdapter';
import CancelWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/CancelWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class CancelWorkOrderAction {
  private adapter: CancelWorkOrderAdapter;
  private handler: CancelWorkOrderHandler;

  public constructor(adapter: CancelWorkOrderAdapter, handler: CancelWorkOrderHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'CancelWorkOrderAction: WorkOrder has been updated'));
  }
}

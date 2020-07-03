import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import TakeWorkOrderAdapter from '../../Adapters/WorkOrder/TakeWorkOrderAdapter';
import TakeWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/TakeWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class TakeWorkOrderAction {
  private adapter: TakeWorkOrderAdapter;
  private handler: TakeWorkOrderHandler;

  public constructor(adapter: TakeWorkOrderAdapter, handler: TakeWorkOrderHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'TakeWorkOrderAction: WorkOrder has been updated'));
  }
}

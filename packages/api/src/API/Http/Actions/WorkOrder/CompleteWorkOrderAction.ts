import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import CompleteWorkOrderAdapter from '../../Adapters/WorkOrder/CompleteWorkOrderAdapter';
import CompleteWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/CompleteWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class CompleteWorkOrderAction {
  private adapter: CompleteWorkOrderAdapter;
  private handler: CompleteWorkOrderHandler;

  public constructor(adapter: CompleteWorkOrderAdapter, handler: CompleteWorkOrderHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'CompleteWorkOrderAction: WorkOrder has been updated'));
  }
}

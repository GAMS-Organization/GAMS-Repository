import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateWorkOrderAdapter from '../../Adapters/WorkOrder/UpdateWorkOrderAdapter';
import UpdateWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/UpdateWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateWorkOrderAction {
  private adapter: UpdateWorkOrderAdapter;
  private handler: UpdateWorkOrderHandler;

  public constructor(adapter: UpdateWorkOrderAdapter, handler: UpdateWorkOrderHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateWorkOrderAction: WorkOrder has been updated'));
  }
}

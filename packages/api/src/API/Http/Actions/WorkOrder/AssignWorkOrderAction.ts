import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import AssignWorkOrderAdapter from '../../Adapters/WorkOrder/AssignWorkOrderAdapter';
import AssignWorkOrderHandler from '../../../../Application/Handlers/WorkOrder/AssignWorkOrderHandler';
import UpdateWorkOrderPresenter from '../../Presenters/WorkOrder/UpdateWorkOrderPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class AssignWorkOrderAction {
  private adapter: AssignWorkOrderAdapter;
  private handler: AssignWorkOrderHandler;

  public constructor(adapter: AssignWorkOrderAdapter, handler: AssignWorkOrderHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateWorkOrderPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'AssignWorkOrderAction: WorkOrder has been updated'));
  }
}

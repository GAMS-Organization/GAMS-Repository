import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateElementRequestAdapter from '../../Adapters/ElementRequest/UpdateElementRequestAdapter';
import UpdateElementRequestHandler from '../../../../Application/Handlers/ElementRequest/UpdateElementRequestHandler';
import UpdateElementRequestPresenter from '../../Presenters/ElementRequest/UpdateElementRequestPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateElementRequestAction {
  private adapter: UpdateElementRequestAdapter;
  private handler: UpdateElementRequestHandler;

  public constructor(adapter: UpdateElementRequestAdapter, handler: UpdateElementRequestHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateElementRequestPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateElementRequestAction: ElementRequest has been updated'));
  }
}

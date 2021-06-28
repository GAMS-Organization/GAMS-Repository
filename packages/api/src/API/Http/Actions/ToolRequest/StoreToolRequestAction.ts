import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreElementRequestAdapter from '../../Adapters/ElementRequest/StoreElementRequestAdapter';
import StoreElementRequestHandler from '../../../../Application/Handlers/ElementRequest/StoreElementRequestHandler';
import StoreElementRequestPresenter from '../../Presenters/ElementRequest/StoreElementRequestPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreToolRequestAction {
  private adapter: StoreElementRequestAdapter;
  private handler: StoreElementRequestHandler;

  public constructor(adapter: StoreElementRequestAdapter, handler: StoreElementRequestHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreElementRequestPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreElementRequestAction: ElementRequest has been created'));
  }
}

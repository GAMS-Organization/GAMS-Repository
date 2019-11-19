import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreProductAdapter from '../../Adapters/Product/StoreProductAdapter';
import StoreProductHandler from '../../../../Application/Handlers/Product/StoreProductHandler';
import StoreProductPresenter from '../../Presenters/Product/StoreProductPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreUsersAction {
  private adapter: StoreProductAdapter;
  private handler: StoreProductHandler;

  public constructor(adapter: StoreProductAdapter, handler: StoreProductHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreProductPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreProductAction: Product has been created'));
  }
}

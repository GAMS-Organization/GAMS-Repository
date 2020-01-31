import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import UpdateProductAdapter from '../../Adapters/Product/UpdateProductAdapter';
import UpdateProductHandler from '../../../../Application/Handlers/Product/UpdateProductHandler';
import UpdateProductPresenter from '../../Presenters/Product/UpdateProductPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class UpdateUsersAction {
  private adapter: UpdateProductAdapter;
  private handler: UpdateProductHandler;

  public constructor(adapter: UpdateProductAdapter, handler: UpdateProductHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new UpdateProductPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'UpdateProductAction: Product has been updated'));
  }
}

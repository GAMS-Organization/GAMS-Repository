import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowProductAdapter from '../../Adapters/Product/ShowProductAdapter';
import ShowProductHandler from '../../../../Application/Handlers/Product/ShowProductHandler';
import GetProductPresenter from '../../Presenters/Product/GetProductPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class ShowProductAction {
  private adapter: ShowProductAdapter;
  private handler: ShowProductHandler;

  public constructor(adapter: ShowProductAdapter, handler: ShowProductHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetProductPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowProductAction: Product has been retrieved'));
  }
}

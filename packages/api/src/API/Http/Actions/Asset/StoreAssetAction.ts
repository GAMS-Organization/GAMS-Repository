import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import StoreAssetAdapter from '../../Adapters/Asset/StoreAssetAdapter';
import StoreAssetHandler from '../../../../Application/Handlers/Asset/StoreAssetHandler';
import StoreAssetPresenter from '../../Presenters/Asset/StoreAssetPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class StoreAreaAction {
  private adapter: StoreAssetAdapter;
  private handler: StoreAssetHandler;

  public constructor(adapter: StoreAssetAdapter, handler: StoreAssetHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new StoreAssetPresenter(result);

    return response
      .status(HTTP_CODES.CREATED)
      .json(success(presenter.getData(), 'StoreAssetAction: Asset has been created'));
  }
}

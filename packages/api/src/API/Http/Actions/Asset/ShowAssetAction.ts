import { Request, Response } from 'express';
import { success } from '../../../../utils/customResponse';
import ShowAssetAdapter from '../../Adapters/Asset/ShowAssetAdapter';
import ShowAssetHandler from '../../../../Application/Handlers/Asset/ShowAssetHandler';
import GetAllAssetPresenter from '../../Presenters/Asset/GetAllAssetsPresenter';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';

@injectable()
export default class ShowAssetAction {
  private adapter: ShowAssetAdapter;
  private handler: ShowAssetHandler;

  public constructor(adapter: ShowAssetAdapter, handler: ShowAssetHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<Response> {
    const command = this.adapter.from(request);

    const result = await this.handler.execute(command);

    const presenter = new GetAllAssetPresenter(result);

    return response
      .status(HTTP_CODES.OK)
      .json(success(presenter.getData(), 'ShowAssetAction: Asset has been retrieved'));
  }
}

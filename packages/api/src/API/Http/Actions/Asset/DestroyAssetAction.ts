import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroyAssetAdapter from '../../Adapters/Asset/DestroyAssetAdapter';
import DestroyAssetHandler from '../../../../Application/Handlers/Asset/DestroyAssetHandler';

@injectable()
export default class DestroyAssetAction {
  private adapter: DestroyAssetAdapter;
  private handler: DestroyAssetHandler;

  public constructor(adapter: DestroyAssetAdapter, handler: DestroyAssetHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}

import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatuses';
import DestroySectorAdapter from '../../Adapters/Sector/DestroySectorAdapter';
import DestroySectorHandler from '../../../../Application/Handlers/Sector/DestroySectorHandler';

@injectable()
export default class DestroySectorAction {
  private adapter: DestroySectorAdapter;
  private handler: DestroySectorHandler;

  public constructor(adapter: DestroySectorAdapter, handler: DestroySectorHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(request: Request, response: Response): Promise<void> {
    const command = this.adapter.from(request);

    await this.handler.execute(command);

    return response.status(HTTP_CODES.NO_CONTENT).end();
  }
}
